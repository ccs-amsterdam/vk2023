import { load } from "outstatic/server";
import markdownToHtml from "../lib/markdownToHtml";
import Background from "./background";
import Link from "next/link";

export default async function Index() {
  const { content, coverImage } = await getData();

  return (
    <div className="relative animate-fade-in">
      <div className="relative  left-0 flex  h-full px-4 z-10 lg:mb-10">
        <div className="w-full mx-auto">
          <VuLogo />
        </div>
      </div>
      <Background>
        {/* <div className="relative flex z-20 mt-[clamp(7rem,24vw,12rem)]  lg:-mt-8">
          <div className="flex lg:w-full max-w-[1200px] mx-auto lg:ml-auto  px-4 md:px-8 ">
            <div
              className="flex-auto relative w-full max-w-2xl prose mt-8 p-8 rounded prose-invert bg-[hsl(var(--secondary)/0.93)] lg:bg-primary lg:border-4 border-primary"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div> */}
      </Background>
    </div>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "home" }, [
      "content",
      "title",
      "coverImage",
    ])
    .first();

  const content = await markdownToHtml(page.content);

  return {
    content,
    coverImage: page.coverImage,
  };
}

function VuLogo() {
  return (
    <div className="flex  items-center  gap-x-3 pr-4">
      <Link href="https://vu.nl/nl">
        <img
          src="/images/logo_vu.svg"
          alt="logo"
          className=" w-36 md:w-56 lg:w-80"
        />
      </Link>
      <div className=" lg:pl-5 text-secondary text-[11px] md:text-[16px] lg:text-[25px]">
        <h3 className="font-sans ">Faculty of Social Sciences</h3>
        <h3 className="font-bold text-primary tracking-[0.075em]">
          Societal Analytics Lab
        </h3>
      </div>
    </div>
  );
}
