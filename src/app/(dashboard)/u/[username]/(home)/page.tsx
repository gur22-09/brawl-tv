import type { Metadata, ResolvingMetadata } from 'next';
import { StreamPlayer } from '@/components/ui/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata(
  props: CreatorPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `${props.params.username}'s Dashboard`,
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const u = await currentUser();
  const user = await getUserByUsername(params.username, {
    includeStream: true,
    inlcudeFollowCount: true,
  });

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
        followerCount={user._count.followedBy}
        bio={user.bio}
        isFollowing
      />
    </div>
  );
};

export default CreatorPage;
