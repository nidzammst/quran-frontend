import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./button";
import {
  BookmarkCheck,
  BookOpen,
  House,
  Languages,
  LaptopMinimal,
  Menu,
  MoonStar,
  SlidersHorizontal,
  SunMoon,
  Tag,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Toggle } from "./toggle";
import { useSingleSuratStore, useSiteSettingsStore } from "@/lib/stores/store";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Separator } from "./separator";
import Link from "next/link";

const MenuDrawer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const {
    translationOpen,
    setTranslationOpen,
    customDrawerOpen,
    setCustomDrawerOpen,
  } = useSingleSuratStore();
  const {
    translationId,
    setTranslationId,
    theme,
    setThemeStore,
    ayatSaved,
    sheetSaved,
  } = useSiteSettingsStore();

  const changePathname = (lang: "id" | "ar" | "en"): void => {
    setTranslationId(lang);
    const path = pathname.split("/");
    path[1] = lang;
    const newPath = path.join("/");
    router.push(newPath);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (theme === "dark") {
      toast(
        `${
          translationId === "id"
            ? "Mode malam telah diaktifkan"
            : translationId === "en"
            ? "Dark mode is activated"
            : "تم تنشيط الوضع المظلم"
        }`
      );
    } else if (theme === "light") {
      toast(
        `${
          translationId === "id"
            ? "Mode siang telah diaktifkan"
            : translationId === "en"
            ? "Light mode is activated"
            : "تم تنشيط وضع الضوء"
        }`
      );
    } else if (theme === "system") {
      toast(
        `${
          translationId === "id"
            ? "Mode system telah diaktifkan"
            : translationId === "en"
            ? "System mode is activated"
            : "تم تنشيط وضع الضوء"
        }`
      );
    }
  }, [theme]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="h-8 w-8 mr-3">
        <Button variant="outline">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50%] px-6 pt-8 sm:flex-row sm:justify-between gap-4">
        <div className="w-full">
          <h3 className="font-bold mb-2">Settings</h3>
          <div className="flex flex-row gap-3 content-center items-center justify-between mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Link href={`/${translationId}/sheet/1`}>
                    <Button className="w-full" variant="outline">
                      <BookOpen size={48} strokeWidth={3} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Buka versi halaman</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Toggle
                    pressed={theme === "light"}
                    variant="outline"
                    onPressedChange={() => {
                      setThemeStore("light");
                      setTheme("light");
                    }}
                    className="w-full"
                  >
                    <SunMoon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>Light Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Toggle
                    pressed={theme === "system"}
                    variant="outline"
                    onPressedChange={() => {
                      setThemeStore("system");
                      setTheme("system");
                    }}
                    className="w-full"
                  >
                    <LaptopMinimal className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>System Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Toggle
                    pressed={theme === "dark"}
                    variant="outline"
                    onPressedChange={() => {
                      setThemeStore("dark");
                      setTheme("dark");
                    }}
                    className="w-full"
                  >
                    <MoonStar className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>Dark Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator
              orientation="vertical"
              className={`h-10 relative top-0 ${
                pathname.split("/").length <= 2 && "hidden"
              } `}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={`w-full ${
                    pathname.split("/").length <= 2 && "hidden"
                  }`}
                >
                  <Toggle
                    pressed={customDrawerOpen}
                    variant="outline"
                    onPressedChange={() => setCustomDrawerOpen()}
                    className="w-full"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  {translationId === "id"
                    ? "Lihat terjemahan atau tafsir"
                    : "See Translation or tafsir"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Separator orientation="vertical" className={`h-24 max-sm:hidden`} />
        <div className="w-full">
          <h3 className="font-bold mb-2">Languages</h3>
          <div className="flex flex-row gap-2 justify-between">
            <Toggle
              pressed={translationId === "id"}
              variant="outline"
              className="w-full"
              onClick={() => changePathname("id")}
            >
              ID
            </Toggle>
            <Toggle
              pressed={translationId === "en"}
              variant="outline"
              className="w-full"
              onClick={() => changePathname("en")}
            >
              EN
            </Toggle>
            <Toggle
              pressed={translationId === "ar"}
              variant="outline"
              className="w-full"
              onClick={() => changePathname("ar")}
            >
              AR
            </Toggle>

            <Separator
              orientation="vertical"
              className={`h-10 relative top-0 ${
                translationId === "ar" || pathname.split("/").length <= 2
                  ? "hidden"
                  : ""
              } `}
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Toggle
                    pressed={translationOpen}
                    variant="outline"
                    onPressedChange={() => setTranslationOpen()}
                    className={`${
                      translationId === "ar" || pathname.split("/").length <= 2
                        ? "hidden"
                        : "w-full"
                    }`}
                  >
                    <Languages className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  {translationId === "id"
                    ? "Buka terjemahan"
                    : "Open Translation"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <>
          <Separator orientation="vertical" className={`h-24 max-sm:hidden`} />
          <div className="w-full">
            <h3 className="font-bold mb-2">Others</h3>
            <div className="flex flex-row gap-2">
              {ayatSaved.surat !== "" && ayatSaved.ayat !== "" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/${translationId}/surat/${ayatSaved.surat}#${ayatSaved.ayat}`
                          )
                        }
                      >
                        <BookmarkCheck size={48} strokeWidth={3} className="" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Buka ayat tersimpan</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {sheetSaved !== 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={`/${translationId}/sheet/${sheetSaved}`}>
                        <Button className="w-full" variant="outline">
                          <Tag size={48} strokeWidth={3} className="" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Buka Halaman tersimpan</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={`${pathname.split("/").length <= 2 && "hidden"}`}
                  >
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/${translationId}`)}
                    >
                      <House />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Back to home</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
