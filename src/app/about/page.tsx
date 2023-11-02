import { load } from "outstatic/server";
import markdownToHtml from "@/lib/markdownToHtml";
import PersonItem from "@/components/PersonItem";

export default async function Index() {
  const { content, people } = await getData();
  return (
    <div className="animate-fade-in flex flex-col lg:flex-row max-w-[1200px] mx-auto px-4 md:px-8">
      <div
        className="flex-auto relative w-full max-w-2xl mx-auto lg:mx-0 prose md:prose-xl mt-4 lg:mt-8 overflow-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="relative flex px-4 ml-auto w-full lg:w-1/3 mt-12 lg:mt-8">
        <div className="flex flex-col mx-auto items-center gap-8 flex-auto">
          <h2 className="text-center text-2xl font-bold">
            The Societal Analytics Lab Team
          </h2>
          {people.map((person) => {
            return <PersonItem key={person.name} person={person} />;
          })}
        </div>
      </div>
    </div>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "about" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  const allPeople = await db
    .find({ collection: "people" }, ["title", "content", "coverImage"])
    .sort({ publishedAt: 1 })
    .toArray();

  const people = allPeople.map((person) => {
    return {
      name: person.title,
      avatar: person.coverImage || "",
      function: person.content,
    };
  });

  return { content, people };
}
