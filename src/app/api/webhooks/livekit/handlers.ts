import { db } from '@/lib/db';
import { WebhookEvent } from 'livekit-server-sdk';
import { always, cond, equals, T } from 'ramda';

export async function handleLivekitEvent(event: WebhookEvent) {
  return cond([
    [
      equals('ingress_started'),
      //@ts-ignore
      async () => {
        await db.stream.update({
          where: {
            ingressId: event.ingressInfo?.ingressId,
          },
          data: {
            isLive: true,
          },
        });

        return new Response('Successfully started ingress', { status: 200 });
      },
    ],
    [
      equals('ingress_ended'),
      //@ts-ignore
      async () => {
        await db.stream.update({
          where: {
            ingressId: event.ingressInfo?.ingressId,
          },
          data: {
            isLive: false,
          },
        });

        return new Response('Successfully ended ingress', { status: 200 });
      },
    ],
    //@ts-ignore-next-line
    [T, always(new Response('', { status: 200 }))],
  ])(event.event || '') as Promise<Response>;
}
