import { load } from "outstatic/server";
import ContentGrid from "@/components/ContentGrid";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const { content, allProjects } = await getData();

  return (
    <div className="animate-fade-in max-w-[1200px] mx-auto px-4 md:px-8 w-full">
      <section className="mt-8 mb-16 md:mb-12">
        <div
          className="prose md:prose-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>

      {allProjects.length > 0 && (
        <ContentGrid items={allProjects} collection="rapporten" />
      )}
    </div>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "rapporten" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  const allProjects = (
    await db
      .find({ collection: "reports", status: "published" }, [
        "title",
        "slug",
        "coverImage",
        "status",
        "publishedAt",
        "author",
      ])
      .sort({ publishedAt: -1 })
      .toArray()
  ).filter((project) => project.status.toLowerCase() === "published");
  return {
    content,
    allProjects,
  };
}
