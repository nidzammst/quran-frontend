"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { fetchHaditsInfo } from "@/lib/fetch";
import { HaditsDataInfo } from "@/lib/hadits-model";
import React, { useEffect, useState } from "react";
import { HoverEffectType } from "./SuratList";

const HaditsPage = () => {
  const [haditsList, setHaditsList] = useState<HoverEffectType[]>();

  console.log(haditsList);

  useEffect(() => {
    const fetchData = async () => {
      const haditsInfo = await fetchHaditsInfo();
      const newData = haditsInfo?.map((hadits: HaditsDataInfo) => {
        return {
          title: `${hadits.name}`,
          description: `Total : ${hadits.total} hadits`,
          link: `/id/hadits/${hadits.slug}`,
        };
      });
      setHaditsList(newData);
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto py-6 flex flex-row flex-wrap">
      {haditsList !== undefined && (
        <HoverEffect items={haditsList} className="w-full" />
      )}
    </main>
  );
};

export default HaditsPage;
