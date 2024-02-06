import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth-service';
import { getBlockedUsers } from '@/lib/block-service';
import { format } from 'date-fns';
import { columns } from './_components/columns';
import { CommunityTable } from './_components/community-table';

export const metadata: Metadata = {
  title: 'Community',
};

const Page = async () => {
  const self = await getCurrentUser();
  const blockedUsers = await getBlockedUsers(self.id);

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy HH:MM'),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {self.username}&apos;s Community Settings
        </h1>
      </div>
      <CommunityTable columns={columns} data={formattedData} />
    </div>
  );
};

export default Page;
