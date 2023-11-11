import { load } from "outstatic/server";
import markdownToHtml from "@/lib/markdownToHtml";
import IndexRouting from "./IndexRouting";

const indices = [{ label: "State of the Union", index: "state_of_the_union" }];

export default async function Index({
  searchParams,
}: {
  searchParams: { index?: string };
}) {
  const data = await getData();

  return (
    <>
      <div className="animate-fade-in max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <IndexRouting data={data} />
      </div>
    </>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "dashboard" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  return { content };
}
