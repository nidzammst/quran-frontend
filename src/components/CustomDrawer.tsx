import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import React from "react";
import { Button } from "./ui/button";

import "./custom-drawer.css";
import { useSingleSuratStore } from "@/lib/stores/store";

const CustomDrawer = ({
  type,
  title,
  content,
  lang,
}: {
  type: "tafsir" | "translation";
  lang: "en" | "id";
  title: string;
  content: string | undefined;
}) => {
  const { customDrawerOpen } = useSingleSuratStore();
  return (
    <Drawer>
      <DrawerTrigger
        className={`text-white mt-4 w-full bg-transparent ${
          !customDrawerOpen && "hidden"
        }`}
      >
        <Button variant="secondary" className="w-full">
          {lang === "id"
            ? `Buka ${type === "tafsir" ? type : "Terjemahan"}`
            : `Open ${type}`}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-700 text-white max-h-[500px]">
        <DrawerHeader>
          <div className="flex flex-row text-center items-center justify-center max-sm:justify-between gap-3 w-full">
            <DrawerTitle className="text-neutral-800 dark:text-neutral-200 stext-2xl font-bold">
              {title}
            </DrawerTitle>
            <DrawerClose>
              <Button
                variant="secondary"
                className="items-end text-end absolute right-4 top-6"
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            <h3 className="text-neutral-800 dark:text-neutral-200 text-4xl font-bold text-left max-sm:text-2xl mt-4">
              {type === "tafsir"
                ? "Tafsir"
                : lang === "id"
                ? "Terjemahan"
                : "Translation"}{" "}
              :
            </h3>
            <h4 className="text-neutral-800 dark:text-neutral-200 leading-10 text-2xl max-sm:text-xl text-justify font-normal font-sans mt-7 max-sm:mt-6 max-md:mt-0 px-3 max-sm:px-0 max-h-[350px] overflow-y-scroll scrollable">
              <span className="font-semibold italic text-2xl mr-1">
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;
              </span>
              {content}
              <span className="font-semibold italic text-2xl ml-1">&quot;</span>
            </h4>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
