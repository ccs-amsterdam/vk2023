"use client";

import { useSearchParams } from "next/navigation";
import Dashboard from "./Dashboard";
import Stemrij from "@/components/Stemrij";

const indices = [{ label: "State of the Union", index: "state_of_the_union" }];

interface Props {
  data: { content: string };
}

export default function IndexRouting({ data }: Props) {
  const params = useSearchParams();
  const index = params?.get("index");

  if (index) return <Index indexId={index} />;

  return <SelectIndex content={data.content} />;
}

function SelectIndex({ content }: { content: string }) {
  return (
    <section className="flex flex-col justify-center text-center relative mt-8 mb-16 md:mb-12">
      <div
        className="mx-auto w-full max-w-[800px] relative prose md:prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="mx-auto w-full max-w-[600px] mt-20">
        <div className="border-b-2 border-gray-400">
          {indices.map((index, i) => {
            return (
              <Stemrij
                key={index}
                nr={i + 1}
                label={index.label}
                link={`/dashboard?index=${index.index}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Index({ indexId }: { indexId: string }) {
  const index = indices.find((i) => i.index === indexId);
  return <Dashboard index={index} />;
}
