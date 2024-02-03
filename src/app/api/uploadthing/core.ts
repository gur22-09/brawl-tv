import { getCurrentUser } from '@/lib/auth-service';
import { db } from '@/lib/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  uploadThumbnail: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getCurrentUser();

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return {
        fileUrl: file.url,
        uploadedBy: metadata.user.id
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
