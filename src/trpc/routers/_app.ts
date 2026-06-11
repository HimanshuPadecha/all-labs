import { createTRPCRouter } from "../init";
import { adminRouter } from "./admin-router";
import { seedRouter } from "./seed-router";

export const appRouter = createTRPCRouter({
  seed: seedRouter,
  admin : adminRouter
});

export type AppRouter = typeof appRouter;
