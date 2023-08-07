import MCQ from "@/components/MCQ";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  // getting the gameId from the url
  params: {
    gameId: string;
  };
};

// passing in the gameid into the page component
const page = async ({ params: { gameId } }: Props) => {
  // protecting this route, if no authorized user then they can't access this page
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  // fetching our game from our prisma db
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    // do a sql join, and include the questions from the gameId into this prisma call
    // since in our prisma file we defined a one-to-many relationship between the game and the questions
    include: {
      questions: {
        // selecting only the necessary params, so the user cannot access the answer through checking the network calls or anything and cheat
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  // another redirect call if a user manually tries redirecting to a different game
  if (!game || game.gameType !== 'mcq') {
    return redirect('/quiz')
  }

  
  return <MCQ game={game}/>;
};

export default page;
