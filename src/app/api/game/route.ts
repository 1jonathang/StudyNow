// api/game

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

// REST endpoint for calling gpt and submitting a quiz
export async function POST(req: Request, res: Response) {
  try {
    // unathorized users cannot call this endpoint
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
    // getting body
    const body = await req.json();
    // deconstructing the body and guaranteeing that it is of the type we want
    const { amount, topic, type } = getQuestionsSchema.parse(body);

    // getting the data from our prisma schema and passing in the details from our req's body
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic: topic,
      },
    });

    // hitting our own rest endpoint
    // the data will contain an object of questions (an array of questions that we want)
    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      // getting the required parameters to generate questions from gpt
      amount,
      topic,
      type,
    });

    // creating a type for multiple choice questions to use here
    if (type === "mcq") {
      type mcqQuestions = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      // getting the data and mapping through each question, creating a json object of the answers and question and answer from each question
      let manyData = data.questions.map((question: mcqQuestions) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        // will be randomized so the user will get randomly sorted questions each time
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          // in our schema we specified the options to be a json string so we have to pass it in through stringify
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      // creating the type for an open ended question
      type openQuestion = {
        question: string;
        answer: string;
      };
      let manyData = data.questions.map((question: openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }

    return NextResponse.json({
      gameId: game.id
    })
    // catching the errors
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
