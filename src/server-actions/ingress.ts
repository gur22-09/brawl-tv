'use server';

import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
} from 'livekit-server-sdk';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-service';
import { andThen, ifElse, pipe } from 'ramda';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function resetIngresses(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}
export async function createIngress(type: IngressInput) {
  const user = await getCurrentUser();

  await resetIngresses(user.id);

  return pipe(
    (user): CreateIngressOptions => ({
      name: user.username,
      roomName: user.id,
      participantName: user.username,
      participantIdentity: user.id,
    }),
    ifElse(
      (_) => type === IngressInput.WHIP_INPUT,
      (options): CreateIngressOptions => {
        options.bypassTranscoding = true;
        return options;
      },
      (options: CreateIngressOptions) => {
        options.video = {
          source: TrackSource.CAMERA,
          preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        };
        options.audio = {
          source: TrackSource.MICROPHONE,
          preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        };
        return options;
      },
    ),
    async (options) => {
      const ingress = await ingressClient.createIngress(type, options);

      if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error('Failed to create ingress');
      }

      await db.stream.update({
        where: { userId: user.id },
        data: {
          ingressId: ingress.ingressId,
          serverUrl: ingress.url,
          streamKey: ingress.streamKey,
        },
      });
    },
    andThen(() => {
      revalidatePath(`/u/${user.username}/keys`);
    }),
  )(user);
}
