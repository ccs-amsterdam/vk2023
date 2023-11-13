import { load } from "outstatic/server";
import markdownToHtml from "@/lib/markdownToHtml";
import ContentGrid from "@/components/ContentGrid";

export default async function Index() {
  const { content, allMedia } = await getData();
  return (
    <>
      <div className="animate-fade-in max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <section className="relative mt-8 mb-16 md:mb-12">
          <div className="relative prose md:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
        {allMedia.length > 0 && <ContentGrid items={allMedia} collection="media" />}
      </div>
    </>
  );
}

async function getData() {
  const db = await load();

  const page = await db.find({ collection: "pages", slug: "media" }, ["content"]).first();

  const content = await markdownToHtml(page.content);

  const allMedia = await db
    .find({ collection: "media" }, ["title", "content", "coverImage", "url", "author"])
    .sort({ publishedAt: 1 })
    .toArray();
  return {
    content,
    allMedia,
  };
}
