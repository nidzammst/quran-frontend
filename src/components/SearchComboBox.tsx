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

export function SearchComboBox({ ayat }: { ayat: number[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between fixed z-10"
        >
          {value
            ? ayat.find((ayat) => ayat.toString() === value)
            : "Select ayat..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ayat..." className="h-9" />
          <CommandList>
            <CommandEmpty>No ayat found.</CommandEmpty>
            <CommandGroup>
              {ayat.map((ayat) => (
                <CommandItem
                  key={ayat.toString()}
                  value={ayat.toString()}
                  onSelect={(currentValue) => {
                    router.push(`#ayat-${ayat.toString()}`);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {ayat.toString()}
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
