import { Prisma } from '@prisma/client';

// https://github.com/prisma/prisma/discussions/10928

export type UserType = Prisma.UserGetPayload<{
  include: {
    following: true;
    followedBy: true;
  };
}>;

export type FollowType = Prisma.FollowGetPayload<{
  include: {
    follower: true;
    following: true;
  };
}>;

