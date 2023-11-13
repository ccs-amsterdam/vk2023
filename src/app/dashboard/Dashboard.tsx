"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QueryForm from "@/amcat/QueryForm/QueryForm";
import { AggregationOptions, AmcatQuery } from "@/amcat/interfaces";
import amcatGuest from "@/lib/amcatGuest";
import { X } from "lucide-react";
import Articles from "@/amcat/Articles/Articles";
import AggregateResult from "@/amcat/Aggregate/AggregateResult";

interface Props {
  index: {
    label: string;
    index: string;
  };
}

const user = amcatGuest();

interface IndexAggregation {
  title: string;
  options: AggregationOptions;
}

const indexAggregations: Record<string, IndexAggregation[]> = {
  tk2023_media: [
    {
      title: "Aantal artikelen per partij per week",
      options: {
        display: "linechart",
        axes: [
          { field: "date", name: "Datum", interval: "week" },
          { field: "party", name: "Partij" },
        ],
      },
    },
  ],
};

export default function IndexDashboard({ index }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState<AmcatQuery>({});

  const goBack = () => router.push("/dashboard");

  const aggregations = indexAggregations[index.index] || [];

  return (
    <div>
      <div className="border-b-2 border-gray-400 pb-4">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex prose gap-3 items-center mb-6 justify-center lg:justify-start p-1">
            <h1 className="m-0">{index.label}</h1>
            <div className="cursor-pointer p-2" onClick={goBack}>
              <X className="w-8 h-8 text-secondary p-0" />
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
      </div>
      <div className="flex flex-col-reverse gap-10 xl:gap-5 xl:flex-row p-1 mt-6 justify-between items-center xl:items-start">
        <div className="min-w-[400px] ">
          <Articles user={user} index={index.index} query={query} />
        </div>
        <div className="max-w-[800px] flex flex-col">
          {aggregations.map((agg) => {
            return (
              <div key={agg.title} className="flex-auto">
                <h3 className="text-right font-bold text-lg prose mt-5">
                  {agg.title}
                </h3>
                <AggregateResult
                  user={user}
                  index={index.index}
                  query={query}
                  options={agg.options}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

{
  /* <AggregateResultPanel user={user} index={index.index} query={query} /> */
}
