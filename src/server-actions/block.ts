'use server'

import { blockUser, unblockUser } from '@/lib/block-service';
import { throwError } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { andThen, pipe } from 'ramda';

//TODO - write a live stream disconnect
//TODO - kick the user from steam also

export async function onBlock(id: string) {
  return pipe(
    async (id) => {
      try {
        return await blockUser(id);
      } catch {
        return throwError('Failed to Block user');
      }
    },
    andThen((user) => {
      revalidatePath('/');

      revalidatePath(`/${user.blocked.username}`);

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
        return throwError('Failed to un-Block user');
      }
    },
    andThen((user) => {
      revalidatePath('/');

      revalidatePath(`/${user.blocked.username}`);

      return user;
    }),
  )(id);
}