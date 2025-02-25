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
      <DialogContent className="min-w-[860px] min-h-[720px] max-sm:min-w-[375px] max-sm:max-w-[90%] max-sm:min-h-[720px] max-sm:max-h-[80%] max-md:min-w-[640px] max-md:max-w-[90%] max-md:min-h-[820px] max-md:max-h-[80%]">
        <SearchComboBox />
      </DialogContent>
    </Dialog>
  );
};

export default SearchTrigger;
