import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import {redirect} from 'next/navigation'

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    // means user is logged in
    return redirect('/dashboard')
  }
  return (
    // center everything in the middle
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to StudyNow!</CardTitle>
          <CardDescription>
            StudyNow is a quiz app that allows you to create and share quizzes with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign in with Google"/>
        </CardContent>
      </Card>
    </div>
  );
}
