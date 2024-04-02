import { z } from "zod";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import {
  CostOptimizationHubClient,
  GetRecommendationCommand,
  ListRecommendationsCommand,
} from "@aws-sdk/client-cost-optimization-hub";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const awsRouter = createTRPCRouter({
  getEC2Instances: publicProcedure
    .input(z.object({}))
    .mutation(async ({ input }) => {
      const ec2Client = new EC2Client({ region: "us-east-1" });

      const data = await ec2Client.send(new DescribeInstancesCommand({}));
      data.Reservations?.forEach((reservation) => {
        reservation.Instances?.forEach((instance) => {
          console.log("Instance ID:", instance.InstanceId);
        });
      });

      return {
        data: data,
      };
    }),
  listRecommendationsCommand: publicProcedure
    .input(z.object({}))
    .mutation(async ({ input }) => {
      const client = new CostOptimizationHubClient({ region: "us-east-1" });
      const command = new ListRecommendationsCommand({});

      const data = await client.send(command);

      return {
        data: data,
      };
    }),
  getRecommendationCommand: publicProcedure
    .input(z.object({ recommendationId: z.string() }))
    .mutation(async ({ input }) => {
      const client = new CostOptimizationHubClient({ region: "us-east-1" });
      const command = new GetRecommendationCommand({
        recommendationId: input.recommendationId,
      });

      const data = await client.send(command);

      return {
        data: data,
      };
    }),

  // for our next function I guess we can terminate an EC2 instance
});

// const aws
