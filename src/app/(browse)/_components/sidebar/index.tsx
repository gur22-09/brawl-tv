import { getRecommended } from '@/lib/recommended-service';
import { Recommended, RecommendedSkeleton } from './recommended';
import { Following, FollowingSkeleton } from './following';
import { ToggleWrapper, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';
import { getFollowing } from '@/lib/follow-service';

const SideBar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowing();

  return (
    <Wrapper>
      <ToggleWrapper />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex h-full w-[70px] flex-col border-r bg-background lg:w-60">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
