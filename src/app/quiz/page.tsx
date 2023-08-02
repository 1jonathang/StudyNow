import QuizCreation from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  titke: "Quiz | StudyNow",
};

const page = async (props: Props) => {
  // getting session 
  const session = await getAuthSession();
  // if no logged authorized logged in user, redirect to home page
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <QuizCreation />
  )
};

export default page;
