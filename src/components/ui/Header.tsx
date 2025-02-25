"use client";

import { useCallback, useEffect, useState } from "react";
import { VerseComboBox } from "../VerseComboBox";
import { SuratComboBox } from "../SuratComboBox";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import MenuDrawer from "./MenuDrawer";
import SearchTrigger from "./SearchTrigger";
import { useSingleSuratStore, useSiteSettingsStore } from "@/lib/stores/store";
import Image from "next/image";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { singleSurat, translationOpen, customDrawerOpen } =
    useSingleSuratStore();
  const { translationId } = useSiteSettingsStore();

  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    if (translationOpen) {
      toast(
        `${
          translationId === "id"
            ? "Terjemahan terbuka"
            : translationId === "en"
            ? "Translation has been opened"
            : "تم فتح الترجمة"
        }`
      );
    } else {
      toast(
        `${
          translationId === "id"
            ? "Terjemahan tertutup"
            : translationId === "en"
            ? "Translation has been closed"
            : "تم إغلاق الترجمة"
        }`
      );
    }
  }, [translationOpen]);

  useEffect(() => {
    if (customDrawerOpen) {
      toast(
        `${
          translationId === "id"
            ? "Menu Terjemahan dan Tafsir tertutup"
            : "Translation and Tafsir menu has been closed"
        }`
      );
    } else if (!customDrawerOpen) {
      toast(
        `${
          translationId === "id"
            ? "Menu Terjemahan dan Tafsir terbuka"
            : "Translation and Tafsir menu has been appeared"
        }`
      );
    }
  }, [customDrawerOpen]);

  useEffect(() => {
    toast(
      `${
        translationId === "id"
          ? "Bahasa telah diganti"
          : translationId === "en"
          ? "Language has been changed"
          : "تم استبدال اللغة"
      }`
    );
  }, [translationId]);

  return (
    <header
      className={`z-50 fixed top-0 left-0 w-full justify-between bg-black border border-zinc-800 shadow-md shadow-zinc-900 transition-transform duration-300 flex flex-row content-center items-center ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      } ${pathname.split("/").length > 2 && "py-4"}`}
    >
      <div
        className={`relative hidden dark:flex cursor-pointer ${
          pathname.split("/").length > 2 && "dark:hidden"
        }`}
      >
        <Image
          alt="al-qur'an-logo"
          height={80}
          width={80}
          src={"/kitab-dark.png"}
          className=""
          onClick={() => router.push(`${translationId}`)}
        />
        <span className="font-arabic font-extrabold text-right items-center content-center -ml-2">
          القرآن الكريم
        </span>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-row justify-end max-sm:justify-end">
        <div className="w-full flex content-center items-center gap-2 flex-row-reverse absolute right-0 mr-4 top-0 mt-3">
          <MenuDrawer />
          <SearchTrigger />
          <div className="flex flex-row gap-3 justify-start max-sm:flex-wrap">
            <SuratComboBox hidden={pathname.split("/").length <= 2} />
            <VerseComboBox
              hidden={pathname.split("/").length <= 2}
              ayat={singleSurat?.verses.map((vers) => vers.number) ?? []}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
