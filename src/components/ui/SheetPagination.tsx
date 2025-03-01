"use client";

import React, { useMemo } from "react";
import { Pagination, PaginationContent, PaginationItem } from "./pagination";
import { Button } from "./button";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Bookmark,
  BookmarkCheck,
  House,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSiteSettingsStore } from "@/lib/stores/store";
import { Separator } from "./separator";
import Link from "next/link";

const SheetPagination = ({ routes }: { routes: string[] }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);

  const { sheetSaved, setSheetSaved, translationId } = useSiteSettingsStore();

  const createNewPath = (newRoute: string): string => {
    const path = pathname.split("/");
    path[path.length - 1] = newRoute;

    const newPath = path.join("/");
    return newPath;
  };
  const numbersOfSheet = useMemo<number[]>(() => {
    return Array.from({ length: 604 }, (_, index) => index + 1);
  }, []);

  return (
    <Pagination className="fixed bottom-0 z-10 text-black opacity-0 animate-pulse duration-5000">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              router.push(`${createNewPath(routes[0])}`);
            }}
          >
            <ArrowLeftFromLine size={48} color="#ffffff" strokeWidth={3} />
          </Button>
        </PaginationItem>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {routes[1]}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[50px]">
            <Command>
              <CommandInput placeholder="" />
              <CommandList>
                <CommandEmpty>Melebihi batas halaman</CommandEmpty>
                <CommandGroup aria-sort="none">
                  {numbersOfSheet.map((number) => (
                    <CommandItem
                      key={number}
                      value={number.toString()}
                      onSelect={(currentValue) => {
                        router.push(`${createNewPath(currentValue)}`);
                        setOpen(false);
                      }}
                    >
                      {number}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <PaginationItem>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              router.push(`${createNewPath(routes[2])}`);
            }}
          >
            <ArrowRightFromLine size={48} color="#ffffff" strokeWidth={3} />
          </Button>
        </PaginationItem>

        <Separator orientation="vertical" />

        <Button
          variant="secondary"
          onClick={() => {
            setSheetSaved(Number(pathname.split("/")[3]));
            router.push(createNewPath(pathname.split("/")[3]));
          }}
        >
          <BookmarkCheck
            size={48}
            color="#ffffff"
            strokeWidth={3}
            className={`${
              pathname.split("/")[3] !== sheetSaved.toString() && "hidden"
            }`}
          />
          <Bookmark
            size={48}
            color="#ffffff"
            strokeWidth={3}
            className={`${
              pathname.split("/")[3] === sheetSaved.toString() && "hidden"
            }`}
          />
        </Button>
        <Link href={`/${translationId}`}>
          <Button variant="secondary">
            <House size={48} color="#ffffff" strokeWidth={3} />
          </Button>
        </Link>
      </PaginationContent>
    </Pagination>
  );
};

export default SheetPagination;
