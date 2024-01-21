import { always, cond, equals, T, ifElse, isNil, curry } from 'ramda';
import { db } from '@/lib/db';
import { WebhookEventType } from '@clerk/nextjs/server';

type eventType = WebhookEventType;

export const handleClerkEvent = async (eventType: eventType, payload: any) => {
  return cond([
    [equals('user.created'), () => handleUserCreated(payload)],
    [equals('user.updated'), () => handleUserUpdated(payload)],
    [equals('user.deleted'), () => handleUserDeleted(payload)],
    //@ts-ignore-next-line
    [T, always(new Response('', { status: 200 }))],
  ])(eventType);
};

async function handleUserCreated(payload: any) {
//  console.log('creating user', payload);
  await db.user.create({
    data: {
      externalUserId: payload.data.id,
      username: payload.data.username,
      imageUrl: payload.data.image_url,
    },
  });

  return new Response('', { status: 200 });
}

async function handleUserDeleted(payload: any) {
//  console.log('deleting user', payload);
  await db.user.delete({
    where: {
      externalUserId: payload.data.id,
    },
  });

  return new Response('', { status: 200 });
}

async function handleUserUpdated(payload: any): Promise<void | Response> {
//  console.log('updating user', payload);
  const findUser = async () =>
    db.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      },
    });

  const updateUser = async () => {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
    return new Response('', { status: 200 });
  };

  const user = await findUser();

  return ifElse(
    isNil,
    always(new Response('User not found', { status: 404 })),
    updateUser,
  )(user);
}
