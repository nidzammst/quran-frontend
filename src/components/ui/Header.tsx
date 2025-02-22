"use client";

import { useSingleSuratStore } from "@/lib/stores/store";
import { useCallback, useEffect, useState } from "react";
import { VerseComboBox } from "../VerseComboBox";
import { Languages } from "lucide-react";
import { Toggle } from "./toggle";
import { SuratComboBox } from "../SuratComboBox";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { singleSurat, translationOpen, setTranslationOpen } =
    useSingleSuratStore();
  const controlHeader = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll ke bawah
        setShowHeader(false);
      } else {
        // Scroll ke atas
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [controlHeader]);

  return (
    <header
      className={`z-50 fixed top-0 left-0 w-full bg-black border border-zinc-800 shadow-md transition-transform duration-300 ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto p-4 flex flex-row justify-between">
        <h1 className="text-xl font-bold">Al-Qur&apos;anul Karim</h1>

        <div className="flex flex-row gap-3">
          <SuratComboBox />
          <VerseComboBox
            ayat={singleSurat?.verses.map((vers) => vers.number) ?? []}
          />
          <Toggle
            pressed={translationOpen}
            variant="outline"
            onPressedChange={() => setTranslationOpen()}
          >
            <Languages className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </header>
  );
};

export default Header;
