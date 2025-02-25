import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Search } from "lucide-react";
import { SearchComboBox } from "../SearchComboBox";
import { usePathname } from "next/navigation";

const SearchTrigger = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[810px] min-h-[810px] max-sm:min-w-[350px] max-sm:max-w-[85%] max-sm:min-h-[350px] max-sm:max-h-[70%] max-md:min-w-[640px] max-md:max-w-[90%] max-md:min-h-[820px] max-md:max-h-[80%] max-lg:min-w-[400px] max-lg:max-w-[80%] max-sm:mb-16 overflow-hidden">
        <SearchComboBox />
      </DialogContent>
    </Dialog>
  );
};

export default SearchTrigger;
