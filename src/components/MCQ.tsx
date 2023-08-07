"use client";

import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  // passing in a game. but also joining quetions as we did in the mcq page
  // we need to pick certain attributes from the question like we did before
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  // getting the question index, so when the user moves on to a different question, we know what questions he's on
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  // index of the selected question the user picks
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);

  // we want to calculate something, but don't want it to recalculate every render so we use useMemo
  // getting the current question, based off of what question index we're at
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
    // passing in the question index along with the game.questions so that we have a dependancy array
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        {/* topic */}
        <p>
          <span className="text-slate-400">Topic</span>
          <span className="ml-2 px-2 py-1 text-white rounded-lg bg-slate-800">
            {game.topic}
          </span>
        </p>
        <div className="flex self-start mt-3 text-slate-400">
          <Timer className="mr-2" />
          <span>0:00</span>
        </div>

        {/* <MCQCounter /> */}
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className="mb-1">{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {/* mapping through all the questions within the array of questions*/}
        {options.map((option, index) => {
          return (
            <Button
              // functionality to change styling of the button when user clicks on it
              variant={selectedChoice === index ? "default" : "secondary"}
              // when user clicks on a different button, it sets the selected choice of the index of the button that the user just clicked
              onClick={() => {
                setSelectedChoice(index);
              }}
              key={index}
              className="justify-start w-full py-8 mb-4"
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border- rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
      </div>
      <Button className="mt-2">
        Next <ChevronRight className="w-4 h-4 ml-2"/>
      </Button>
    </div>
  );
};

export default MCQ;
