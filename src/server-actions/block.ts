'use server';

import { getCurrentUser } from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';
import { RoomServiceClient } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';
import { andThen, pipe } from 'ramda';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

export async function onBlock(id: string) {
  return pipe(
    async (id) => {
      const self = await getCurrentUser();
      try {
        await blockUser(id);
      } catch {}

      try {
        await roomService.removeParticipant(self.id, id);
      } catch {
        throw new Error('failed to block user');
      }

      return self;
    },
    andThen((user) => {
      revalidatePath(`/u/${user.username}/community`);

      return user;
    }),
  )(id);
}

export async function onUnBlock(id: string) {
  return pipe(
    async (id) => {
      try {
        return await unblockUser(id);
      } catch {
        throw new Error('Failed to un-Block user');
      }
    },
    andThen(async (blocked) => {
      const user = await getCurrentUser();
      revalidatePath('/');

      revalidatePath(`/u/${user.username}/community`);

      return blocked;
    }),
  )(id);
}
