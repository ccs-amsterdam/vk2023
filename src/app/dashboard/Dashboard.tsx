"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QueryForm from "@/amcat/QueryForm/QueryForm";
import { AmcatQuery } from "@/amcat/interfaces";
import amcatGuest from "@/lib/amcatGuest";
import { X } from "lucide-react";
import AggregateResultPanel from "@/amcat/Aggregate/AggregateResultPanel";

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

  const goBack = () => router.push("/dashboard");

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
      <div className="p-1">
        <AggregateResultPanel user={user} index={index.index} query={query} />
      </div>
    </div>
  );
}
