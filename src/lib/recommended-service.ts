import { andThen, defaultTo, pipe } from 'ramda';
import { getCurrentUser } from './auth-service';
import { db } from './db';

export async function getRecommended() {
  return pipe(
    async () => {
      try {
        const user = await getCurrentUser();
        return user.id;
      } catch {
        return '';
      }
    },
    // tryCatch(  TODO - find better tryCatch ramda alternative, currently it does not catch
    // github issue - https://github.com/ramda/ramda/issues/2877
    //   async () => {
    //     const user = await getCurrentUser();
    //     return user.id;
    //   },
    //   async () => {
    //     return new Promise<string>((res) => res('')); // for effective composition return type should match
    //   },
    // ),
    andThen(async (userId) => {
      if (userId) {
        return await db.user.findMany({
          where: {
            AND: [
              {
                NOT: {
                  id: userId,
                },
              },
              {
                NOT: {
                  followedBy: {
                    some: {
                      followerId: userId,
                    },
                  },
                },
              },
              {
                NOT: {
                  blocking: {
                    some: {
                      blockedId: userId,
                    },
                  },
                },
              },
            ],
          },
          include: {
            stream: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } else {
        return await db.user.findMany({
          include: {
            stream: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      }
    }),
    andThen(defaultTo([])),
  )();
}
