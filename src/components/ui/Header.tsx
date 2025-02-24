"use client";

import { useSingleSuratStore, useTranslationIdStore } from "@/lib/stores/store";
import { useCallback, useEffect, useState } from "react";
import { VerseComboBox } from "../VerseComboBox";
import { House, Languages, Search } from "lucide-react";
import { Toggle } from "./toggle";
import { SuratComboBox } from "../SuratComboBox";
import { toast } from "sonner";
import { MyDropdownMenu } from "./MyDropdownMenu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { singleSurat, translationOpen, setTranslationOpen } =
    useSingleSuratStore();
  const { translationId } = useTranslationIdStore();

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
      className={`z-50 fixed top-0 left-0 w-full justify-between bg-black border border-zinc-800 shadow-md shadow-zinc-900 transition-transform duration-300 ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto p-4 flex flex-row justify-between max-sm:justify-end">
        <h1
          className={`text-xl font-bold cursor-pointer max-sm:hidden`}
          onClick={() => router.push("/")}
        >
          Al-Qur&apos;anul Karim
        </h1>

        <div className="flex flex-row content-center items-start gap-2 max-sm:">
          <div className="flex flex-row gap-3 justify-start max-sm:flex-wrap">
            <SuratComboBox hidden={pathname.split("/").length <= 2} />
            <VerseComboBox
              hidden={pathname.split("/").length <= 2}
              ayat={singleSurat?.verses.map((vers) => vers.number) ?? []}
            />
            <MyDropdownMenu />
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="outline"
                  className={`max-w-[130px] max-sm:max-w-[100px] ${
                    pathname.split("/").length > 2 && "hidden"
                  }`}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Toggle
              pressed={translationOpen}
              variant="outline"
              onPressedChange={() => setTranslationOpen()}
            >
              <Languages className="h-4 w-4" />
            </Toggle>
            <Link
              href={`/${translationId}`}
              className={`${
                pathname.split("/").length <= 2 ? "hidden" : "sm:hidden"
              }`}
            >
              <Button variant="outline">
                <House className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
