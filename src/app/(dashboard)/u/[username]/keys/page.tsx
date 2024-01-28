import { UrlCard } from './_components/url-card';
import { getCurrentUser } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { KeyCard } from './_components/key-card';
import { ConnectModal } from './_components/connect-modal';

const KeysPage = async () => {
  const self = await getCurrentUser();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Keys & URLs</div>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl || ''} />
        <KeyCard value={stream.streamKey || ''} />
      </div>
    </div>
  );
};

export default KeysPage;
