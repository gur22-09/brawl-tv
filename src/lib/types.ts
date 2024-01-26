import { Prisma, Stream } from '@prisma/client';

// https://github.com/prisma/prisma/discussions/10928

export type UserType = Prisma.UserGetPayload<{
  include: {
    following: true;
    followedBy: true;
    blockedBy: true;
    blocking: true;
  };
}>;

export type FollowType = Prisma.FollowGetPayload<{
  include: {
    follower: true;
    following: true;
  };
}>;

export type BlockType = Prisma.BlockGetPayload<{
  include: {
    blocker: true;
    blocked: true;
  };
}>;

export type UpdateStreamValues = Pick<
  Stream,
  'name' | 'isChatEnabled' | 'isChatFollowersOnly' | 'isChatDelayed'
>;
