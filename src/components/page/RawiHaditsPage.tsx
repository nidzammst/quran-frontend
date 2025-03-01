"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { fetchHaditsByRawi } from "@/lib/fetch";
import { Rawi, SingleHaditsResponse } from "@/lib/hadits-model";
import React, { useEffect, useState } from "react";
import { HoverEffectType } from "./SuratList";

const RawiHaditsPage = ({ rawi }: { rawi: Rawi }) => {
  const [haditsList, setHaditsList] = useState<HoverEffectType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const haditsData = await fetchHaditsByRawi(rawi);
      const newData = haditsData?.map((hadits: SingleHaditsResponse) => {
        return {
          title: `Hadits no. ${hadits.number}`,
          description: `${hadits.arab}`,
          link: `/hadits/${rawi}/${hadits.number}`,
        };
      });
      setHaditsList(newData);
    };

    fetchData();
  }, [rawi, haditsList]);

  return (
    <main className="container mx-auto py-6 flex flex-row flex-wrap">
      {haditsList !== undefined ? (
        <HoverEffect items={haditsList} className="w-full" />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default RawiHaditsPage;
