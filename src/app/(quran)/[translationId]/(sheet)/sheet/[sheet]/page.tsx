import SingleSheet from "@/components/page/SingleSheet";
import { SwipeNavigator } from "@/components/page/SwipeNavigator";
import SheetPagination from "@/components/ui/SheetPagination";
import React from "react";

const page = async ({ params }: { params: Promise<{ sheet: string }> }) => {
  const { sheet } = await params;

  const routes = [
    sheet === "1" ? "604" : (Number(sheet) - 1).toString(),
    sheet,
    sheet === "604" ? "1" : (Number(sheet) + 1).toString(),
  ];

  return (
    <SwipeNavigator routes={routes}>
      <div className="bg-slate-50 container relative flex h-screen max-sm:w-full w-[50%] max-lg:w-[75%] overflow-y-hidden text-center justify-center mx-auto overflow-clip border border-neutral-200 shadow-lg shadow-neutral-300/50">
        <SheetPagination routes={routes} />
        <SingleSheet sheet={sheet} />;
      </div>
    </SwipeNavigator>
  );
};

export default page;
