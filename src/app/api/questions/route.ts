import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// post request to chatgpt
export async function POST(req: Request, res: Response) {
  try {
    // unauthorized cannot use this post endpoint
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in to create a quiz",
        },
        {
          status: 401,
        }
      );
    }
    // getting body request
    const body = await req.json();
    // deconstructing the body, so if the parse function returns true, then it is guaranteed that it is a question schema type
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    // generating prompts for open ended questions
    if (type === "open_ended") {
      // calling our strict output function
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        // passing in an array of how many questions the user wishes to recieve
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        // the type of output we want gpt to give
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
      // generating prompts for multiple choice questions
    } else if (type === "mcq") {
      // awaiting our strict output function
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        // the type of output we want gpt to give out, in this case three options alongside a correct answer
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    // returning the responses with a 200 okay status code
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
    // catching errors
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error(
        "Something went wrong with GPT. This may be an issue with your api key/account.",
        error
      );
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
