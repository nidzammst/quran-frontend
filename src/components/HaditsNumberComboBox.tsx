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
import { HaditsDataInfo, Rawi } from "@/lib/hadits-model";

const hadits: HaditsDataInfo[] = [
  { name: "Abu Dawud", slug: Rawi.AbuDawud, total: 4419 },
  { name: "Ahmad", slug: Rawi.Ahmad, total: 4305 },
  { name: "Bukhari", slug: Rawi.Bukhari, total: 6638 },
  { name: "Darimi", slug: Rawi.Darimi, total: 2949 },
  { name: "Ibnu Majah", slug: Rawi.IbnuMajah, total: 4285 },
  { name: "Malik", slug: Rawi.Malik, total: 1587 },
  { name: "Muslim", slug: Rawi.Muslim, total: 4930 },
  { name: "Nasai", slug: Rawi.Nasai, total: 5364 },
  { name: "Tirmidzi", slug: Rawi.Tirmidzi, total: 3625 },
];

export function HaditsNumberComboBox({
  hidden,
  rawi,
}: {
  hidden: boolean;
  rawi: Rawi;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const selectedHadits = hadits.find((h) => h.slug === rawi);

  const numbersOfHadits = React.useMemo<number[]>(() => {
    if (!selectedHadits?.total) {
      return [];
    }
    return Array.from(
      { length: selectedHadits.total },
      (_, index) => index + 1
    );
  }, [selectedHadits]);

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
            {value ? value : "nomor hadits"}
            <ChevronsUpDown className="opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0 max-sm:max-w-[100px]">
        <Command>
          <CommandInput placeholder="Pilih no. hadits" className="h-9" />
          <CommandList>
            <CommandEmpty>No hadits found</CommandEmpty>
            <CommandGroup>
              {numbersOfHadits.map((hadits) => (
                <CommandItem
                  key={hadits.toString()}
                  value={hadits.toString()}
                  onSelect={(currentValue) => {
                    router.push(`/hadits/${rawi}/${hadits.toString()}`);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {hadits.toString()}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === hadits.toString() ? "opacity-100" : "opacity-0"
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
