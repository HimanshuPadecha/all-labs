import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { db } from "..";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createTRPCContext = cache(async () => {

  const { userId: clerkId } = await auth();

  return { clerkId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;
  const { clerkId } = ctx;

  if (!clerkId) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId));

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
