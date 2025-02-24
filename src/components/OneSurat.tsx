"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { OneSuratResponse } from "@/lib/quran-model";
import { convertToArabicNumbers } from "@/lib/latinToArabic";
import { useQuranStore } from "@/lib/stores/store";
// import Link from "next/link";

const OneSurat = ({ translation }: { translation: string }) => {
  const [surat, setSurat] = useState<OneSuratResponse>();
  const [error, setError] = useState(null);

  const { loading, fetchSuratListData } = useQuranStore();

  const fetchData = useCallback(() => {
    fetchSuratListData();
    fetch(`https://quran-api2.vercel.app/api/${translation}/surat/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((data) => {
        const newData = data.data;
        setSurat(newData);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  }, [error, translation, fetchSuratListData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ayatData = surat?.verses.map((vers) => {
    return {
      title:
        translation === "id"
          ? `Ayat ke ${vers.number}`
          : translation === "en"
          ? `Verse ${vers.number}`
          : `الآية ${convertToArabicNumbers(vers.number)}`,
      content: (
        <div>
          <h3 className="text-neutral-800 dark:text-neutral-200 text-5xl max-sm:text-3xl max-sm:leading-relaxed max-md:leading-relaxed leading-loose max-sm:font-light font-arabic text-right">
            {vers.text}
          </h3>
          <h4 className="text-neutral-800 dark:text-neutral-200 leading-10 text-2xl text-justify font-light font-sans mt-20 max-sm:mt-6 max-md:mt-0">
            {}
            {translation !== "ar" && (
              <span className="font-bold italic text-3xl mr-1">&quot;</span>
            )}
            {translation === "id"
              ? vers.translation_id
              : translation === "en"
              ? vers.translation_en
              : null}
            {translation !== "ar" && (
              <span className="font-bold italic text-3xl mr-1">&quot;</span>
            )}
          </h4>
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        {loading ? <div>Loading SuratList...</div> : <div>Data fetched</div>}
        {surat !== undefined ? (
          <Timeline
            data={ayatData as TimelineEntry[]}
            customData={{
              title: surat.name,
              description:
                translation === "id"
                  ? surat.name_translations.id
                  : translation === "en"
                  ? surat.name_translations.en
                  : surat.name_translations.ar,
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default OneSurat;
