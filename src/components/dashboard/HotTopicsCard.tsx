import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CustomWordCloud from "../CustomWordCloud";

type Props = {};

const HotTopicsCard = (props: Props) => {
  return (
    <Card className="col-span-4 bg-slate-100/50 dark:bg-[#020817] dark:bg-opacity-55 dark:hover:opacity-55 hover:cursor-pointer transition-all hover:opacity-75">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>Click on a topic to start a quiz!</CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <CustomWordCloud />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
