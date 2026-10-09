"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <Button
      type="button"
      size="icon"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed cursor-pointer bottom-12 right-6 z-50 h-11 w-11 rounded-full opacity-80 shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}