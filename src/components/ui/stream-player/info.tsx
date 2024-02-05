'use client'

import Image from 'next/image';
import { EditStreamModal } from './edit-stream-modal';

interface StreamInfoProps {
  streamName: string;
  thumbnailUrl: string;
  hostId: string;
  viewerId: string;
}
export const Info = ({
  streamName,
  thumbnailUrl,
  hostId,
  viewerId,
}: StreamInfoProps) => {
  const isHostViewer = `host-${hostId}` === viewerId;

  if (!isHostViewer) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div>
            <h2 className="text-sm font-semibold capitalize lg:text-lg">
              Your stream info
            </h2>
          </div>
          {isHostViewer && (
            <EditStreamModal
              streamName={streamName}
              thumbnailUrl={thumbnailUrl}
            />
          )}
        </div>
        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Name</h3>
            <p className="text-sm font-semibold">{streamName}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video w-[200px] overflow-hidden rounded-md border border-white/10">
                <Image
                  className="object-cover"
                  fill
                  src={thumbnailUrl}
                  alt={''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
