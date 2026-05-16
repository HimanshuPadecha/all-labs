import { users } from "@/db/schema";
import { db } from "@/index";
import { client } from "@/utils/upstash";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        labId: z.string().uuid(),
        subjectId: z.string().uuid(),
      }),
    )
    .middleware(async ({ req: _req, input }) => {
      const { userId: clerkId } = await auth();

      console.log({ clerkId });

      if (!clerkId) {
        throw new UploadThingError({
          code: "NOT_FOUND",
          message: "clerk id not found !!",
        });
      }

      const [user] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.clerkId, clerkId));

      // if (user.id !== process.env.ADMIN_USERID) {
      //   throw new UploadThingError({
      //     code: "BAD_REQUEST",
      //     message: "You are not the admin !!",
      //   });
      // }

      if (!user || !user.id) {
        throw new UploadThingError({
          code: "BAD_REQUEST",
          message: "User not authorized",
        });
      }

      return {
        ...input,
        userId: user.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId, labId,subjectId } = metadata;

      await client.trigger({
        url: `${process.env.UPSTASH_WORKFLOW_URL}/api/workflow/generate-questions`,
        retries: 2,
        body: {
          imageUrl: file.ufsUrl,
          subjectId,
          labId,
          fileKey: file.key,
        },
      });

      return { imageUrl: file.ufsUrl, fileKey: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
