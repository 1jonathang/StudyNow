// validate any input from form
import { z } from "zod";

// defining what the form will accept
export const quizCreationSchema = z.object({
    // topic of the input will be a string, 4-50 characteres inclusive, extra param that will be an error message
    topic: z.string().min(4, {message: "Topic must be at least 4 characters long"}).max(50),
    // types of the questions generated, multiple choice question or open ended question
    type: z.enum(['mcq', 'open_ended']),
    // number of questions we want to generate to the user, 1-10 inclusive
    amount: z.number().min(1).max(10)
})
