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

const surat: number[] = [];

for (let i = 1; i <= 114; i++) {
  surat.push(i);
}

export function SuratComboBox({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { translationId } = useTranslationIdStore();

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={`${hidden && "hidden"} max-w-[130px] max-sm:max-w-[100px]`}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] px-0 justify-between"
        >
          <span className="flex flex-row -ml-1 gap-1 content-center items-center w-full justify-between pl-3">
            {value
              ? `Surat ${surat.find((surat) => surat.toString() === value)}`
              : translationId === "en"
              ? "Select Surat"
              : translationId === "id"
              ? "Pilih Surat"
              : "حدد حرف"}
            <ChevronsUpDown className="opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0 max-sm:max-w-[100px]">
        <Command>
          <CommandInput
            placeholder={
              translationId === "en"
                ? "Search Surat..."
                : translationId === "id"
                ? "Cari Surat..."
                : "البحث عن الحروف"
            }
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {translationId === "en"
                ? "No surat found."
                : translationId === "id"
                ? "Surat tidak ditemukan"
                : "لم يتم العثور على رسالة"}
            </CommandEmpty>
            <CommandGroup>
              {surat.map((surat) => (
                <CommandItem
                  key={surat.toString()}
                  value={surat.toString()}
                  onSelect={(currentValue) => {
                    router.push(`/id/surat/${surat.toString()}`);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  Surat {surat.toString()}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === surat.toString() ? "opacity-100" : "opacity-0"
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
