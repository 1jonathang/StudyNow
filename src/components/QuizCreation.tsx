"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {};

// creating the type of our input
type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = (props: Props) => {
  // creating a react hook form and passing in our Input schema to declare what our input and default values will be
  const form = useForm<Input>({
    // need to tell react hook form that we're using zod, so we use zodresolver
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "open_ended",
    },
  });

  // onsubmit function for when we submit our input into the form
  function onSubmit(input: Input) {
    alert(JSON.stringify(input, null, 2));
  }

  // will re-render the whole component whenever the state changes, most notibaly so that the flipping buttons are responsive
  form.watch();

  return (
    // center in absolute center of screen
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic:</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a topic.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount..."
                        {...field}
                        // client-side validation
                        type="number"
                        min={1}
                        max={10}
                        // convert input into an integer
                        onChange={(e) => {
                          form.setValue(`amount`, parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be the number of self-study questions you
                      generate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between ">
                <Button
                  // buttons are automatically set to submit type, so to prevent it from submitting the form through this button we change its type
                  type="button"
                  // onclick function to set the buttons to type to its respected value, so that we can change the variant of it when we click it
                  onClick={() => {
                    form.setValue("type", "mcq");
                  }}
                  className="w-1/2 rounded-none rounded-l-lg text-xs md:text-base"
                  // changing the variant of the button depending on the forms value
                  variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                  }
                >
                  <CopyCheck className="h-4 w-4 mr-2" />
                  Multiple Choice
                </Button>
                {/* separator to divide the two buttons */}
                <Separator orientation="vertical" />
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("type", "open_ended");
                  }}
                  className="w-1/2 rounded-none rounded-r-lg text-xs md:text-base"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Open ended
                </Button>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
