import { StreamPlayer } from '@/components/ui/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const u = await currentUser();
  const user = await getUserByUsername(params.username, true);

  if (!user || u?.id != user.externalUserId || !user.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className="h-full">
      <StreamPlayer
        thumbnailUrl={user.stream.thumbnailUrl}
        hostImageUrl={user.imageUrl}
        streamName={user.stream.name}
        hostName={user.username}
        hostIdentity={user.id}
        isChatEnabled={user?.stream?.isChatEnabled}
        isChatDelayed={user?.stream?.isChatDelayed}
        isChatFollowersOnly={user?.stream?.isChatFollowersOnly}
        isFollowing
      />
    </div>
  );
};

export default CreatorPage;
