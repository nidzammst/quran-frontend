"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useTranslationIdStore } from "@/lib/stores/store";
import { convertArabicToLatin } from "@/lib/latinToArabic";

export function VerseComboBox({
  ayat,
  hidden,
}: {
  ayat: number[];
  hidden: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { translationId } = useTranslationIdStore();

  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={`max-w-[130px] max-sm:max-w-[100px] ${hidden && "hidden"}`}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] px-0 justify-between"
        >
          <span className="flex flex-row -ml-1 gap-1 content-center items-center w-full justify-between pl-3">
            {value
              ? `Ayat ${ayat.find((ayat) => ayat.toString() === value)}`
              : translationId === "id"
              ? "Pilih Ayat"
              : translationId === "en"
              ? "Select verse"
              : "حدد الآية"}
            <ChevronsUpDown className="opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0 max-sm:max-w-[100px]">
        <Command>
          <CommandInput placeholder="Search ayat..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              {translationId === "id"
                ? "Ayat tidak ditemukan"
                : translationId === "en"
                ? "Verse not found."
                : "لم يتم العثور على الآية"}
            </CommandEmpty>
            <CommandGroup>
              {ayat.map((ayat) => (
                <CommandItem
                  key={ayat.toString()}
                  value={ayat.toString()}
                  onSelect={(currentValue) => {
                    router.push(`#${convertArabicToLatin(ayat)}`);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  Ayat {ayat.toString()}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ayat.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
