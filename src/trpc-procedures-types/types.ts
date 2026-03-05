import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";
import { Lab, Subject } from "@/db/schema";


export type seedRouter = inferRouterOutputs<AppRouter>["seed"]

export type SubjectWithLabs = Subject & {
    labs: Lab[];
  };