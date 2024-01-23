'use server';

import { revalidatePath } from 'next/cache';
import { followUser, unfollowUser } from '@/lib/follow-service';
import { andThen, pipe } from 'ramda';
import { throwError } from '@/lib/utils';

export const onFollow = async (userId: string) => {
  return pipe(
    async (id) => {
      try {
        return await followUser(id);
      } catch {
        return throwError('Failed to follow user');
      }
    },
    andThen((user) => {
      revalidatePath('/');

      revalidatePath(`/${user.following.username}`);

      return user;
    }),
  )(userId);
};

export const onUnFollow = async (userId: string) => {
  return pipe(
    async (id) => {
      try {
        return await unfollowUser(id);
      } catch {
        return throwError('Failed to follow user');
      }
    },
    andThen((user) => {
      revalidatePath('/');

      revalidatePath(`/${user.following.username}`);

      return user;
    }),
  )(userId);
};
