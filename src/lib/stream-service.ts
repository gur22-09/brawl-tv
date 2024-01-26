import { pipe } from 'ramda';
import { db } from './db';
import { Stream } from '@prisma/client';

export async function getStreamByUserId(id: string): Promise<Stream | null> {
  return pipe(
    async (id) => await db.stream.findUnique({ where: { userId: id } }),
  )(id);
}
