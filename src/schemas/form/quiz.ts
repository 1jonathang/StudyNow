import { z } from "zod";

// schema for the quiz creationg
export const quizCreationSchema = z.object({
  // the parameters are a topic of min 4 characters, that will output the error message if its less than 4 or greater than 50 chars
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  // the types of questions
  type: z.enum(["mcq", "open_ended"]),
  // the amount of questions between 1-10 inclusive
  amount: z.number().min(1).max(10),
});
