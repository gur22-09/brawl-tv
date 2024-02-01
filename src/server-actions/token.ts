'use server';

import crypto from 'crypto';
import { getCurrentUser } from '@/lib/auth-service';
import { andThen, pipe } from 'ramda';
import { getUserById } from '@/lib/user-service';
import { isBlockedByUser } from '@/lib/block-service';
import { AccessToken } from 'livekit-server-sdk';

const randomUsername = (length: number) => {
  let str = '';
  const charSet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  for (let i = 0; i < length; i++) {
    const randomCharIndex = crypto.randomInt(0, charSet.length - 1);
    str += charSet.charAt(randomCharIndex);
  }
  return str;
};

export async function createViewerToken(hostIdentity: string) {
  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error('Host not found');
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error('Host is blocked ');
  }

  return pipe(
    async () => {
      try {
        const self = await getCurrentUser();
        return { id: self.id, username: self.username };
      } catch {
        const id = crypto.randomUUID();
        const username = `guest#${randomUsername(10)}`;

        return { id, username };
      }
    },
    andThen(({ id, username }) => {
      const isHost = id === host.id;
      const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_SECRET!,
        {
          identity: isHost ? `host-${id}` : id,
          name: username,
        },
      );

      token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
      });

      return token.toJwt();
    }),
  )();
}
