'use server';

import { getCurrentUser } from '@/lib/auth-service';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { andThen, pipe } from 'ramda';

export async function updateUser(values: Partial<User>) {
  return pipe(
    async () => {
      try {
        const user = await getCurrentUser();
        return user;
      } catch {
        return null;
      }
    },
    andThen(async (user) => {
      if (!user) {
        throw new Error('User not found');
      }

      const data = {
        bio: values.bio,
      };

      const updated = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...data,
        },
      });

      return updated;
    }),
    andThen((updated) => {
      revalidatePath(`/u/${updated.username}`);
      revalidatePath(`/${updated.username}`);

      return updated;
    }),
  )();
}
