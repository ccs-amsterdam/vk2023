import { getDocumentSlugs, load } from "outstatic/server";

import DateFormatter from "@/components/DateFormatter";
import { OstDocument } from "outstatic";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

type Project = {
  tags: { value: string; label: string }[];
  url?: string;
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const { project } = await getData(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(`/projects/${project.slug}`),
      images: [
        {
          url: absoluteUrl(project?.coverImage || "/images/og-image.png"),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: absoluteUrl(project?.coverImage || "/images/og-image.png"),
    },
  };
}

export default async function Project(params: Params) {
  const { project, content } = await getData(params);
  if (project == null) return <div>404!</div>;
  return (
    <div className="animate-fade-in max-w-6xl mx-auto md:px-4 md:px-8  ">
      <article className="rounded ">
        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
            {project.title}
          </h1>
          <div className="flex flex-wrap justify-between whitespace-nowrap gap-x-8  md:mb-8 text-slate-600">
            <div className="">
              <DateFormatter dateString={project.publishedAt} />
            </div>
            {project?.author?.name ? `door ${project?.author?.name}` : null}.
          </div>
          {project.description === "" ? null : (
            <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded shadow">
              {project.description}
            </div>
          )}
          {project?.coverImage == null ? null : (
            <div className="relative flex justify-center mb-2 md:mb-4 sm:mx-0">
              <img
                alt={project.title}
                src={project.coverImage ?? ""}
                className="object-cover my-1 w-full border-[1px] rounded-md shadow-md"
              />
            </div>
          )}
        </div>
        {content == null ? null : (
          <div className="max-w-4xl mx-auto  bg-white p-6 md:p-8 lg:p-10 rounded ">
            <div
              className="prose lg:prose-xl prose-h1:text-3xl prose-h1:mb-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </article>
    </div>
  );
}

async function getData({ params }: Params) {
  const db = await load();
  const project = await db
    .find<Project>({ collection: "reports", slug: params.slug }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "author",
      "url",
      "coverImage",
    ])
    .first();

  const token = "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";

  const content =
    project.url == null ? undefined : await (await fetch(project.url)).text();

  return {
    project,
    content,
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("reports");
  return posts.map((slug) => ({ slug }));
}
