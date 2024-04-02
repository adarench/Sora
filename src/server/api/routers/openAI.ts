import { z } from "zod";
import OpenAI from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const systemPrompt = ``;

export const openAIRouter = createTRPCRouter({
  chatCompletion: publicProcedure
    .input(
      z.object({
        conversationHistory: z.array(
          z.object({ role: z.string(), content: z.string() }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const conversationHistory =
        input.conversationHistory as ChatCompletionMessageParam[];

      console.log(conversationHistory);
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "",
            },
            ...conversationHistory,
          ],
          temperature: 0.5,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        return chatCompletion.choices[0]?.message.content;
      } catch (e) {
        console.log(e);
        return "error";
      }
    }),
});
