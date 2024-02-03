import { EditBioModal } from './edit-bio-modal';

interface AboutProps {
  hostName: string;
  hostId: string;
  viewerId: string;
  bio: string | null;
  followerCount: number;
}
export const About = ({
  hostId,
  hostName,
  viewerId,
  bio,
  followerCount,
}: AboutProps) => {
  const isHost = `host-${hostId}` === viewerId;
  const followedByLabel = followerCount === 1 ? 'follower' : 'followers';

  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-background p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
            About {hostName}
          </div>
          {isHost && <EditBioModal bio={bio ?? ''} />}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followerCount}</span>
          &nbsp;
          {followedByLabel}
        </div>
        <p className="text-sm">{bio || 'No bio added'}</p>
      </div>
    </div>
  );
};
