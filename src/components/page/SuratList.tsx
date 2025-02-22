"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { convertToArabicNumbers } from "@/lib/latinToArabic";
import { SuratResponse } from "@/lib/quran-model";
import { useQuranStore } from "@/lib/stores/store";
import React, { useCallback, useEffect, useState } from "react";

export type HoverEffectType = {
  title: string;
  description: string;
  link: string;
};

const QuranPage = ({ translationId }: { translationId: string }) => {
  const [suratList, setSuratList] = useState<HoverEffectType[]>();

  const { suratListData, fetchSuratListData } = useQuranStore();

  const fetchData = useCallback(() => {
    fetchSuratListData();
    const newData = suratListData?.map((surat: SuratResponse) => {
      return {
        title: `${surat.number_of_surah}. ${surat.name} (${
          translationId === "ar"
            ? convertToArabicNumbers(surat.number_of_ayah)
            : surat.number_of_ayah
        }${
          translationId === "id"
            ? " Ayat"
            : translationId === "en"
            ? " Verses"
            : " آية"
        })`,
        description: `${convertToArabicNumbers(surat.number_of_surah)}.  ${
          surat.name_translations.ar
        }`,
        link: `/id/surat/${surat.number_of_surah}`,
      };
    });
    setSuratList(newData);
  }, [fetchSuratListData, suratListData, translationId]);

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
