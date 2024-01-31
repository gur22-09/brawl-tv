import { db } from '@/lib/db';
import { andThen, isNil, isNotNil, pipe, defaultTo } from 'ramda';
import { getCurrentUser } from './auth-service';
import { throwError } from './utils';
import { FollowType } from './types';
import { Follow, User, Stream } from '@prisma/client';


export async function getFollowing(): Promise<
  (Follow & {
    following: User & {
      stream: Stream | null;
    };
  })[]
> {
  return pipe(
    async () => {
      try {
        return await getCurrentUser();
      } catch {
        return undefined;
      }
    },
    andThen(async (user) => {
      if (user) {
        return await db.follow.findMany({
          where: {
            followerId: user.id,
            following: {
              blocking: {
                none: {
                  blockedId: user.id,
                },
              },
            },
          },
          include: {
            following: {
              include: {
                stream: true,
              },
            },
          },
        });
      }
    }),
    andThen(defaultTo([])),
  )();
}

/**
 * takes the id of the user we want to check if is following
 */
export const isFollowingUser = async (id: string): Promise<boolean> => {
  try {
    const [self, other] = await Promise.all([
      getCurrentUser(),
      db.user.findUnique({ where: { id } }),
    ]);

    if (!other) {
      throw new Error('User not found');
    }

    if (other.id === self.id) return true;

    return pipe(
      async (other) => {
        return await db.follow.findFirst({
          where: {
            followerId: self.id,
            followingId: other.id,
          },
        });
      },
      andThen((follow): boolean => isNotNil(follow)),
    )(other);
  } catch {
    return false;
  }
};

export const followUser = async (id: string): Promise<FollowType> => {
  return pipe(
    async (id) => {
      const [self, other] = await Promise.all([
        getCurrentUser(),
        db.user.findUnique({ where: { id } }),
      ]);

      return { self, other };
    },
    andThen(async ({ self, other }) => {
      if (!other) {
        return throwError('User not found');
      }

      if (other.id === self.id) {
        return throwError('You cannot follow yourself');
      }

      const existingFollow = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: other.id,
        },
      });

      if (existingFollow) {
        return throwError('Already following user');
      }

      return { selfId: self.id, otherId: other.id };
    }),
    andThen(async ({ selfId, otherId }) => {
      return await db.follow.create({
        data: {
          followerId: selfId,
          followingId: otherId,
        },
        include: {
          following: true,
          follower: true,
        },
      });
    }),
  )(id);
};

/**
 * takes the id of the user you want to un-following
 */
export const unfollowUser = async (id: string) => {
  return pipe(
    async (id) => {
      const [self, other] = await Promise.all([
        getCurrentUser(),
        db.user.findUnique({ where: { id } }),
      ]);

      return { self, other };
    },
    andThen(async ({ self, other }) => {
      if (!other) {
        return throwError('User not found');
      }

      if (other.id === self.id) {
        return throwError('You cannot unfollow yourself');
      }

      const existingFollow = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: other.id,
        },
      });

      if (isNil(existingFollow)) {
        return throwError('Not following user');
      }

      return existingFollow.id;
    }),
    andThen(async (existingFollowId) => {
      return await db.follow.delete({
        where: {
          id: existingFollowId,
        },
        include: {
          following: true,
        },
      });
    }),
  )(id);
};
