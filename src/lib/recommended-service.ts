import { getCurrentUser } from './auth-service';
import { db } from './db';

export async function getRecommended() {
  return await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
