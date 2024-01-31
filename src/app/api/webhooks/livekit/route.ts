import { headers } from 'next/headers';
import { WebhookReceiver } from 'livekit-server-sdk';
import { handleLivekitEvent } from './handlers';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const auth = headerPayload.get('Authorization');

  if (!auth) {
    return new Response('No authorization header', { status: 400 });
  }

  const event = receiver.receive(body, auth);
  return handleLivekitEvent(event);
}
