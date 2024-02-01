import { db } from '@/lib/db';
import { getCurrentUser } from './auth-service';
import { andThen, isNil, isNotNil, pipe } from 'ramda';
import { BlockType } from './types';

export async function isBlockedByUser(id: string): Promise<boolean> {
  try {
    const [self, other] = await Promise.all([
      getCurrentUser(),
      db.user.findUnique({ where: { id } }),
    ]);

    if (!other) {
      throw new Error('User not found');
    }

    if (other.id === self.id) return false;

    return pipe(
      async (other) => {
        return await db.block.findUnique({
          where: {
            blockerId_blockedId: {
              blockerId: other.id,
              blockedId: self.id,
            },
          },
        });
      },
      andThen((follow): boolean => isNotNil(follow)),
    )(other);
  } catch {
    return false;
  }
}

export async function blockUser(
  id: string,
): Promise<Omit<BlockType, 'blocker'>> {
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
        throw new Error('User not found');
      }

      if (other.id === self.id) {
        throw new Error('You cannot block yourself');
      }

      const existingBlock = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: self.id,
            blockedId: other.id,
          },
        },
      });

      if (existingBlock) {
        throw new Error('Already blocked');
      }

      return { selfId: self.id, otherId: other.id };
    }),
    andThen(async ({ selfId, otherId }) => {
      return await db.block.create({
        data: {
          blockerId: selfId,
          blockedId: otherId,
        },
        include: {
          blocked: true,
        },
      });
    }),
  )(id);
}

export async function unblockUser(id: string) {
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
        throw new Error('User not found');
      }

      if (other.id === self.id) {
        throw new Error('You cannot un-block yourself');
      }

      const existingBlock = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: self.id,
            blockedId: other.id,
          },
        },
      });

      if (isNil(existingBlock)) {
        throw new Error('Not Blocking user');
      }

      return existingBlock.id;
    }),
    andThen(async (existingBlockId) => {
      return await db.block.delete({
        where: {
          id: existingBlockId,
        },
        include: {
          blocked: true,
        },
      });
    }),
  )(id);
}
