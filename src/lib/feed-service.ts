import { andThen, defaultTo, ifElse, isNotNil, pipe } from 'ramda';
import { getCurrentUser } from './auth-service';
import { db } from './db';

export const getStreams = async () => {
  return pipe(
    async () => {
      try {
        const user = await getCurrentUser();
        return user;
      } catch {
        return null;
      }
    },
    andThen(
      ifElse(
        isNotNil,
        async (user) => {
          return await db.stream.findMany({
            where: {
              user: {
                AND: [
                  {
                    NOT: {
                      blocking: {
                        some: {
                          blockedId: user.id,
                        },
                      },
                    },
                  },
                  {
                    NOT: {
                      id: user.id,
                    },
                  },
                ],
              },
            },
            select: {
              id: true,
              user: true,
              isLive: true,
              name: true,
              thumbnailUrl: true,
              updatedAt: true,
            },
            orderBy: [
              {
                isLive: 'desc',
              },
              {
                updatedAt: 'desc',
              },
            ],
          });
        },
        async () => {
          return await db.stream.findMany({
            select: {
              id: true,
              user: true,
              isLive: true,
              name: true,
              thumbnailUrl: true,
              updatedAt: true,
            },
            orderBy: [
              {
                isLive: 'desc',
              },
              {
                updatedAt: 'desc',
              },
            ],
          });
        },
      ),
    ),
    andThen(defaultTo([])),
  )();
};
