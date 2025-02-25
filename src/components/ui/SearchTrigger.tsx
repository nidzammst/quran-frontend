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
      <DialogContent className="min-w-[860px] min-h-[720px]">
        <SearchComboBox />
      </DialogContent>
    </Dialog>
  );
};

export default SearchTrigger;
