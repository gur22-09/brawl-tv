import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { isBlockedByUser } from '@/lib/block-service';
import { StreamPlayer } from '@/components/ui/stream-player';

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const user = await getUserByUsername(username, {
    includeStream: true,
    inlcudeFollowCount: true,
  });

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
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
      isFollowing={isFollowing}
    />
  );
};

export default UserPage;
