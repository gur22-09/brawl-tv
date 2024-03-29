import { currentUser } from '@clerk/nextjs';
import { db } from './db';
import {
  either,
  identity,
  ifElse,
  isNil,
  pipe,
  prop,
  defaultTo,
  andThen,
} from 'ramda';
import { type User as ClerkUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';

export async function getCurrentUser(): Promise<User> {
  const c = await currentUser();
  return pipe(
    ifElse(
      either(isNil, pipe(prop('username'), defaultTo(''), isNil)),
      () => {
        throw new Error('unauthorized');
      },
      identity,
    ),
    async (user: ClerkUser) => {
      return await db.user.findUnique({ where: { externalUserId: user.id } });
    },
    andThen(
      ifElse(
        isNil,
        () => {
          throw new Error('no user found');
        },
        identity,
      ),
    ),
  )(c);
}

export async function getSelfByUsername(username: string): Promise<User> {
  const c = await currentUser();
  return pipe(
    ifElse(
      either(isNil, pipe(prop('username'), defaultTo(''), isNil)),
      () =>{ throw new Error('unauthorized') },
      identity,
    ),
    async (self: ClerkUser) => {
      const user = await db.user.findUnique({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }

      return { self, user };
    },
    andThen(
      ifElse(
        ({ self, user }) => self.username !== user.username,
        () =>{ throw new Error('Unauthorized') }, // a user can check his own dashboard only
        prop('user'),
      ),
    ),
  )(c);
}
