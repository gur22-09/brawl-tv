import { always, cond, equals, T, ifElse, isNil } from 'ramda';
import { db } from '@/lib/db';
import { WebhookEventType } from '@clerk/nextjs/server';

type eventType = WebhookEventType;

export const handleClerkEvent = (eventType: eventType, payload: any) =>
  cond([
    [equals('user.created'), always(handleUserCreated(payload))],
    [equals('user.updated'), always(handleUserUpdated(payload))],
    [equals('user.deleted'), always(handleUserDeleted(payload))],
    //@ts-ignore-next-line
    [T, always(new Response('', { status: 200 }))],
  ])(eventType);

async function handleUserCreated(payload: any) {
  await db.user.create({
    data: {
      externalUserId: payload.data.id,
      username: payload.data.username,
      imageUrl: payload.data.image_url,
    },
  });
}

async function handleUserDeleted(payload: any) {
  await db.user.delete({
    where: {
      externalUserId: payload.data.id,
    },
  });
}

async function handleUserUpdated(payload: any): Promise<void | Response> {
  const findUser = async () =>
    db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      },
    });

  const updateUser = async () => {
    db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  };

  const user = await findUser();

  return ifElse(
    isNil, // Check if user is nil (not found)
    always(new Response('User not found', { status: 404 })), // Return 404 response
    updateUser, // Update user if found
  )(user);
}
