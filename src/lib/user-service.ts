import { db } from './db';

export const getUserByUsername = async (
  username: string,
  { includeStream = false, inlcudeFollowCount = false } = {},
) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: includeStream,
      _count: {
        select: {
          followedBy: inlcudeFollowCount,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string, includeStream = false) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: includeStream,
    },
  });

  return user;
};
