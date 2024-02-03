'use server';

import { getCurrentUser } from '@/lib/auth-service';
import { db } from '@/lib/db';
import { UpdateStreamValues } from '@/lib/types';
import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { andThen, isNil, pipe } from 'ramda';

export async function updateStream(values: Partial<Stream>) {
  return pipe(
    async () => {
      try {
        const self = await getCurrentUser()
        const stream = await db.stream.findUnique({
          where: {
            userId: self.id,
          },
        });
        return stream;
      } catch {
        return null;
      }
    },
    andThen(async (stream) => {
      if (isNil(stream)) {
        throw new Error('Stream not found');
      }

      const data = {
        thumbnailUrl: values.thumbnailUrl,
        name: values.name,
        isChatEnabled: values.isChatEnabled,
        isChatFollowersOnly: values.isChatFollowersOnly,
        isChatDelayed: values.isChatDelayed,
      } as UpdateStreamValues;

      const updated = await db.stream.update({
        where: {
          id: stream.id,
        },
        data: {
          ...data,
        },
        include: {
          user: true,
        },
      });

      return updated;
    }),
    andThen((updated) => {
      revalidatePath(`/u/${updated.user.username}/chat`);
      revalidatePath(`/u/${updated.user.username}`);
      revalidatePath(`/${updated.user.username}`);

      return updated;
    }),
  )();
}
