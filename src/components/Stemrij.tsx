"use client";
import { useRouter } from "next/navigation";

export default function Stemrij(props: {
  nr: number;
  label: string;
  link: string;
}) {
  const router = useRouter();

  return (
    <div
      className="select-none group grid grid-cols-[6rem,1fr] p-2 w-full border-t-2 border-x-2 border-gray-400 cursor-pencil"
      onClick={(e) => {
        e.preventDefault();
        router.push(props.link);
      }}
    >
      <Stemvak nr={props.nr} />
      <div className="my-auto flex-auto ml-[10%] text-2xl md:text-4xl ">
        {props.label}
      </div>
    </div>
  );
}

function Stemvak(props: { nr: number }) {
  return (
    <div className="flex relative items-center  gap-x-3 pr-4">
      <img src="/images/leeg_stemvak.svg" alt="logo" className="w-16 lg:w-20" />
      <img
        src="/images/red_scribble.png"
        alt="logo"
        className="absolute inset-1 ml-[2px] w-12 lg:w-16 hidden group-hover:block"
      />
      <div className="align-bottom mt-auto font-bold">{props.nr}</div>
    </div>
  );
}
