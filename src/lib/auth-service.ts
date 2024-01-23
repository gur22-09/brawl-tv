import { currentUser } from '@clerk/nextjs';
import { db } from './db';
import { either, identity, ifElse, isNil, pipe, prop, defaultTo } from 'ramda';
import { throwError } from './utils';
import { type User as ClerkUser } from '@clerk/nextjs/server';
import { UserType } from './types';

export async function getCurrentUser(): Promise<UserType> {
  const c = await currentUser();
  return pipe(
    ifElse(
      either(isNil, pipe(prop('username'), defaultTo(''), isNil)),
      () => throwError('unauthorized'),
      identity,
    ),
    (user: ClerkUser) => {
      return db.user.findUnique({ where: { externalUserId: user.id } });
    },
    ifElse(isNil, () => throwError('no user found'), identity),
  )(c);
}


