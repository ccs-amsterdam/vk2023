"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// import {
//   Aggregations,
//   Axes,
//   Filters,
//   Queries,
//   postAggregate,
//   postQuery,
//   QueryParams,
//   AggregateParams,
// } from "@/lib/amcat";
import { useState } from "react";
import QueryForm from "@/amcat/QueryForm/QueryForm";
import { AmcatQuery } from "@/amcat/interfaces";
import amcatGuest from "@/lib/amcatGuest";

interface Props {
  index: {
    label: string;
    index: string;
  };
}

const user = amcatGuest();

export default function IndexDashboard({ index }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState<AmcatQuery>({});
  console.log(query);
  // const [aggregate, setAggregate] = useState<AggregateParams>({
  //   index: index.index,
  //   queries: "",
  //   fields: [],
  //   filters: {},
  // });

  // const { queryData } = useQuery({
  //   queryKey: ["query", query],
  //   queryFn: () => postQuery(index, query),
  // });

  // const { aggregateData } = useQuery({
  //   queryKey: ["aggregate", aggregate],
  //   queryFn: () => postAggregate(index, aggregate),
  // });

  // console.log(queryData);
  // console.log(aggregateData);

  const goBack = () => router.push("/dashboard");

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex prose gap-3 items-center mb-6 justify-center lg:justify-start">
          <h1 className="m-0">{index.label}</h1>
          <div className="cursor-pointer p-4" onClick={goBack}>
            {undoIcon}
          </div>
        </div>
        <div className="w-full">
          <QueryForm
            user={user}
            index={index.index}
            value={query}
            onSubmit={setQuery}
          />
        </div>
      </div>
      <div className="border-2 border-gray-400 rounded"></div>
    </div>
  );
}

const undoIcon = (
  <svg
    className="w-6 h-6 text-secondary dark:text-white"
    aria-hidden={true}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 7 1 4l3-3m0 12h6.5a4.5 4.5 0 1 0 0-9H2"
    />
  </svg>
);
