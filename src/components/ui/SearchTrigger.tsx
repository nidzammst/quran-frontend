import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Search } from "lucide-react";
import { SearchComboBox } from "../SearchComboBox";

const SearchTrigger = () => {
  return (
    <Dialog>
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
