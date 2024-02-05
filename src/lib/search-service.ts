import { andThen, ifElse, isNotNil, pipe } from 'ramda';
import { db } from './db';
import { getCurrentUser } from './auth-service';


export const getSearchResults = async (term: string) => {
  return pipe(
    async () => {
      try {
        const user = await getCurrentUser();
        return user.id;
      } catch {
        return null;
      }
    },
    andThen(
      ifElse(
        isNotNil,
        async (id) => {
          return await db.stream.findMany({
            where: {
              user: {
                NOT: {
                  blocking: {
                    some: {
                      blockedId: id,
                    },
                  },
                },
              },
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  user: {
                    username: {
                      contains: term,
                    },
                  },
                },
              ],
            },
            select: {
              user: true,
              id: true,
              name: true,
              isLive: true,
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
            where: {
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  user: {
                    username: {
                      contains: term,
                    },
                  },
                },
              ],
            },
            select: {
              user: true,
              id: true,
              name: true,
              isLive: true,
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
  )();
};
