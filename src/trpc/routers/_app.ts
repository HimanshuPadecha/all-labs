import { createTRPCRouter } from "../init";
import { adminRouter } from "./admin-router";
import { seedRouter } from "./seed-router";
import { userRouter } from "./user-router";

export const appRouter = createTRPCRouter({
  user : userRouter,
  seed: seedRouter,
  admin : adminRouter
});

export type AppRouter = typeof appRouter;
