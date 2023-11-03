"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Index() {
  return (
    <div className="relative animate-fade-in">
      <div className="relative  left-0 flex  h-full px-4 z-10">
        <div className="w-full mx-auto">
          <VuLogo />
        </div>
      </div>
      <section className="flex flex-col gap-8 items-center p-8 relative mb-16 md:mb-12">
        <div className="grid grid-cols-1 w-full max-w-2xl border-b-2 border-gray-400">
          <Stemrij nr={1} label="Over ons" link="/over_ons" />
          <Stemrij nr={2} label="In de media" link="/media" />
          <Stemrij
            nr={3}
            label="Rapporten en visualisaties"
            link="/rapporten"
          />
          <Stemrij nr={4} label="Methodologie" link="/methodologie" />
        </div>
        <div className="w-full max-w-2xl">
          <p>
            U navigeert door het rood maken van een wit stipje, geplaats voor de
            pagina van uw keuze. Het stembiljet wordt zo dicht gevouwen dat uw
            keuze niet zichtbaar is.
          </p>
        </div>
        {/* <div
          className="relative prose md:prose-xl max-w-[1200px]"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
      </section>
    </div>
  );
}

function VuLogo() {
  return (
    <div className="flex flex-col items-center  gap-4 pr-4">
      <Link href="https://vu.nl/nl">
        <img
          src="/images/logo_vu.svg"
          alt="logo"
          className=" w-36 md:w-72 lg:w-96"
        />
      </Link>
      {/* <div className=" lg:pl-5 text-secondary text-[11px] md:text-[16px] lg:text-[25px]">
        <h3 className="font-bold text-primary text-2xl md:text-4xl lg:text-5xl tracking-[0.075em]">
          Verkiezingsonderzoek 2023
        </h3>
      </div> */}
    </div>
  );
}

function Stemrij(props: { nr: number; label: string; link: string }) {
  const router = useRouter();
  return (
    <div
      className="group flex p-2 w-full border-t-2 border-x-2 border-gray-400 cursor-pencil"
      onClick={() => router.push(props.link)}
    >
      <Stemvak />
      <div className="align-bottom mt-auto font-bold">{props.nr}</div>
      <div className="my-auto flex-auto  ml-[10%] text-2xl md:text-4xl">
        {props.label}
      </div>
    </div>
  );
}

function Stemvak() {
  return (
    <div className="flex relative items-center  gap-x-3 pr-4 ">
      <img src="/images/leeg_stemvak.svg" alt="logo" className="w-16 lg:w-20" />
      <img
        src="/images/red_scribble.png"
        alt="logo"
        className="absolute inset-1 ml-[2px] w-12 md:w-16 hidden group-hover:block"
      />
    </div>
  );
}
