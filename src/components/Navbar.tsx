"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const home = pathName === "/";

  if (home)
    return (
      <div
        className="grid transition-all duration-500 w-full min-h-[10rem]
  overflow-visible  backdrop-blur-sm bg-background-transparent d top-0 z-20 "
      >
        <div className="flex p-4 flex-wrap 2xl:flex-nowrap  bg-gray-400 m-8 gap-8 justify-center items-center">
          <div className="text-white font-bold text-5xl md:text-6xl 2xl:text-8xl">
            VU AMSTERDAM
          </div>
          <div className="flex flex-col">
            <div className="text-white text-2xl md:text-3xl 2xl:text-4xl text-center">
              ONDERZOEK NAAR DE VERKIEZINGEN VAN 2023{" "}
            </div>
            <div className="text-white text-2xl hidden 2xl:block">
              U navigeert door het rood maken van een wit stipje{" "}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {!home && (
        <div className="h-[var(--navbar-height)] md:h-[var(--navbar-height-md)]" />
      )}
      <div
        className={`${
          home ? "" : "fixed"
        } grid transition-all duration-500 w-full grid-rows-[var(--navbar-height)]  md:grid-rows-[var(--navbar-height-md)]
        overflow-visible  backdrop-blur-sm bg-background-transparent d top-0 z-20 border-b-2`}
      >
        <div className="flex justify-between md:justify-start relative items-center h-full px-4">
          <div className="">
            <Logo visible={true} />
          </div>

          <ul
            className={`w-full  mx-auto  hidden md:flex text-foreground text-xl ${
              home ? "" : "max-w-[calc(1200px+96px)]"
            }`}
          >
            <Links />
          </ul>
          <FoldedMenu />
        </div>
      </div>
    </>
  );
};

const Links = () => {
  return (
    <>
      <NavItem route="/over_ons">Over ons</NavItem>
      <NavItem route="/media">In de media</NavItem>
      <NavItem route="/rapporten">rapporten en visualisaties</NavItem>
      <NavItem route="/methodologie">methodologie</NavItem>
    </>
  );
};

const NavItem = (props: { children: React.ReactNode; route: string }) => {
  const pathname = usePathname();
  const isActive = pathname === props.route;

  return (
    <Link href={props.route}>
      <button
        className={`transition  p-4 md:px-8    ${
          isActive ? " text-primary" : " text-secondary"
        } hover:text-primary`}
      >
        <span className="font-semibold ">{props.children}</span>
      </button>
    </Link>
  );
};

const FoldedMenu = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (show) {
      ref.current.style.gridTemplateRows = ref.current.scrollHeight + "px";
    } else {
      ref.current.style.gridTemplateRows = "0px";
    }

    function closePopup(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    }

    document.addEventListener("click", closePopup);
    return () => document.removeEventListener("click", closePopup);
  }, [ref, show]);

  return (
    <div className="relative ">
      <Button
        className={`bg-secondary p-1 mt-2 w-12 h-12 md:hidden rounded-full`}
        onClick={() => {
          setShow(!show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
        </svg>
      </Button>
      <div
        ref={ref}
        onClick={() => setShow(false)}
        className={`grid grid-rows-[0px] transition-all fixed top-20 right-4 bg-background overflow-hidden`}
      >
        <div className="rounded w-full h-full border-4 border-secondary py-2">
          <ul className="flex flex-col">
            <Links />
          </ul>
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
};

const Logo = ({ visible }: { visible: boolean }) => {
  return (
    <div className="flex relative items-center  gap-x-3 pr-4 ">
      <Link href="/" className={visible ? "opacity-100" : "opacity-0"}>
        <img
          src="/images/leeg_stemvak.svg"
          alt="logo"
          className="w-16 lg:w-20"
        />
        <img
          src="/images/red_scribble.png"
          alt="logo"
          className="absolute inset-1 ml-[2px] w-16 lg:w-18"
        />
      </Link>
    </div>
  );
};

function Stemvak() {
  return (
    <div className="flex relative items-center  gap-x-3 pr-4 ">
      <img src="/images/leeg_stemvak.svg" alt="logo" className="w-16 lg:w-20" />
      <img
        src="/images/red_scribble.png"
        alt="logo"
        className="absolute inset-1 ml-[2px] w-16 lg:w-18 hidden group-hover:block"
      />
    </div>
  );
}

export default Navbar;
export { Links };
