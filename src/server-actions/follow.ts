'use server';

import { revalidatePath } from 'next/cache';
import { followUser, unfollowUser } from '@/lib/follow-service';
import { andThen, pipe } from 'ramda';

export const onFollow = async (userId: string) => {
  return pipe(
    async (id) => {
      try {
        return await followUser(id);
      } catch {
        throw new Error('Failed to follow user');
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
        throw new Error('Failed to follow user');
      }
    },
    andThen((user) => {
      revalidatePath('/');

      revalidatePath(`/${user.following.username}`);

      return user;
    }),
  )(userId);
};
