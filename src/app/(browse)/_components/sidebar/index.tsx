import { getRecommended } from '@/lib/recommended-service';
import { Recommended, RecommendedSkeleton } from './recommended';
import { Toggle, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';

const SideBar = async () => {
  await new Promise((res) => setTimeout(res, 6000)); 
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex h-full w-[70px] flex-col border-r bg-background lg:w-60">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default SideBar;
