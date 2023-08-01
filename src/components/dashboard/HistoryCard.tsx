"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { BrainCircuit, History } from "lucide-react";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="bg-slate-100/50 dark:bg-[#020817] dark:bg-opacity-55 dark:hover:opacity-55 hover:cursor-pointer transition-all hover:opacity-75"
      onClick={() => router.push("/history")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={28} strokeWidth={2.5} />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">View past quiz attempts</p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
