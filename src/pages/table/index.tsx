import Head from "next/head";

const data = [
  {
    id: 1,
    service: "Service 1",
    potentialSavings: "$1000",
    recommendations: "Optimize usage",
  },
  // More data...
];

export default function TablePage() {
  return (
    <>
      <Head>
        <title>Table</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full">
        <CostRecommendationsTable data={data} />
      </div>
    </>
  );
}

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";

const CostRecommendationsTable = ({
  data,
}: {
  data: {
    id: number;
    service: string;
    potentialSavings: string;
    recommendations: string;
  }[];
}) => {
  const total = data.reduce((acc, row) => {
    return acc + Number(row.potentialSavings.replace("$", ""));
  }, 0);

  return (
    <Table className="w-[600px]">
      <TableCaption>A list of your recommendations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Potential Savings</TableHead>
          <TableHead>Recommendations</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.potentialSavings}</TableCell>
            <TableCell>{row.recommendations}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-red">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
