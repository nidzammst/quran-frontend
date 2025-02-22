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

export function SuratComboBox() {
  const surat: number[] = [];

  for (let i = 1; i <= 114; i++) {
    surat.push(i);
  }
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="max-w-[130px]">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] justify-between"
        >
          {value
            ? `surat ${surat.find((surat) => surat.toString() === value)}`
            : "Pilih surat..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandInput placeholder="Search surat..." className="h-9" />
          <CommandList>
            <CommandEmpty>No surat found.</CommandEmpty>
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
                  surat {surat.toString()}
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
