"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { OneSuratResponse } from "@/lib/quran-model";
import { convertToArabicNumbers } from "@/lib/latinToArabic";
import CustomDrawer from "../CustomDrawer";
import { useSingleSuratStore, useTranslationIdStore } from "@/lib/stores/store";

const OneQuran = ({ id }: { id: string }) => {
  const [surat, setSurat] = useState<OneSuratResponse>();
  const { fetchSingleSurat, singleSurat, translationOpen } =
    useSingleSuratStore();
  const { translationId } = useTranslationIdStore();

  const fetchData = useCallback(() => {
    if (!singleSurat) fetchSingleSurat(translationId as "id" | "ar" | "en", id);
    setSurat(singleSurat);
    return;
  }, [id, fetchSingleSurat, singleSurat, translationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ayatData = surat?.verses.map((vers) => {
    return {
      title:
        translationId === "id"
          ? `Ayat ke ${vers.number}`
          : translationId === "en"
          ? `Verse ${vers.number}`
          : `الآية ${convertToArabicNumbers(vers.number)}`,
      content: (
        <div>
          <h3 className="text-neutral-800 dark:text-neutral-200 text-5xl max-sm:text-3xl max-sm:leading-relaxed max-md:leading-relaxed leading-loose max-sm:font-light font-arabic text-right">
            {vers.text}
          </h3>
          <h4 className="text-neutral-800 dark:text-neutral-200 leading-10 text-2xl text-justify font-light font-sans mt-20 max-sm:mt-6 max-md:mt-0">
            {translationId !== "ar" && translationOpen && (
              <span className="font-bold italic text-3xl mr-1">&quot;</span>
            )}
            {translationId === "id" && translationOpen
              ? vers.translation_id
              : translationId === "en" && translationOpen
              ? vers.translation_en
              : null}
            {translationId !== "ar" && translationOpen && (
              <span className="font-bold italic text-3xl mr-1">&quot;</span>
            )}
          </h4>
          {translationId !== "ar" && (
            <CustomDrawer
              type="translation"
              lang={translationId === "id" ? "id" : "en"}
              title={`Q.S. ${surat.name}:${vers.number}`}
              content={
                translationId === "id"
                  ? vers.translation_id
                  : vers.translation_en
              }
            />
          )}

          {translationId === "id" && (
            <CustomDrawer
              type="tafsir"
              lang={translationId === "id" ? "id" : "en"}
              title={`Q.S. ${surat.name}:${vers.number}`}
              content={surat?.tafsir.id.kemenag.text[vers.number]}
            />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        {surat !== undefined ? (
          <Timeline
            data={ayatData as TimelineEntry[]}
            customData={{
              title: surat.name,
              description:
                translationId === "id"
                  ? surat.name_translations.id
                  : translationId === "en"
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

export default OneQuran;
