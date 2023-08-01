"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const QuizMeCard = (props: Props) => {
  // next/router is for when you're using the pages directory, but we're using the new app directory, so we import from next/navigation
  // using router to programmatically change routes
  const router = useRouter();
  return (
    <Card
      className="bg-slate-100/50 dark:bg-[#020817] dark:bg-opacity-55 dark:hover:opacity-55 hover:cursor-pointer transition-all hover:opacity-75"
      onClick={() => router.push("/quiz")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Quiz Me!</CardTitle>
        <BrainCircuit size={28} strokeWidth={2.5} />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Challenge yourself with a quiz!
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
