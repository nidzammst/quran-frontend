"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { convertToArabicNumbers } from "@/lib/latinToArabic";
import { SuratResponse } from "@/lib/quran-model";
import React, { useCallback, useEffect, useState } from "react";

export type HoverEffectType = {
  title: string;
  description: string;
  link: string;
};

const QuranPage = ({ translationId }: { translationId: string }) => {
  const [suratList, setSuratList] = useState<HoverEffectType[]>();
  const [error, setError] = useState(null);
  console.log(translationId);

  const fetchData = useCallback(() => {
    fetch("https://quran-api2.vercel.app/api/list-surat") // API contoh
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((data) => {
        const newData = data.data.map((surat: SuratResponse) => {
          return {
            title: `${surat.number_of_surah}. ${surat.name} (${surat.number_of_ayah})`,
            description: `${convertToArabicNumbers(surat.number_of_surah)}.  ${
              surat.name_translations.ar
            }`,
            link: `/id/surat/${surat.number_of_surah}`,
          };
        });
        setSuratList(newData);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="container mx-auto py-6 flex flex-row flex-wrap">
      {suratList !== undefined && (
        <HoverEffect items={suratList} className="w-full" />
      )}
    </main>
  );
};

export default QuranPage;
