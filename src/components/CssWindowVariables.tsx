"use client";
import { useEffect } from "react";

export default function CssWindowVariables() {
  useEffect(() => {
    let hasScrolled = false;

    function setScrollProperties(scrollPct: number) {
      document.documentElement.style.setProperty(
        "--scrollPct",
        `${scrollPct}%`
      );
      document.documentElement.style.setProperty(
        "--scrollVh",
        `${scrollPct}vh`
      );
    }

    function setScroll() {
      hasScrolled = true;
      let scrollPct =
        window.scrollY / (document.body.clientHeight - window.innerHeight);
      scrollPct = 100 * Math.min(scrollPct, 1);

      setScrollProperties(scrollPct);
    }

    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  }, []);

  return <></>;
}
