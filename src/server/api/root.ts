import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { awsRouter } from "./routers/aws";
import { openAIRouter } from "./routers/openAI";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  openAI: openAIRouter,
  aws: awsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
