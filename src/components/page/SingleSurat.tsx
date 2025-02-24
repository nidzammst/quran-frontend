"use client";

import { useSingleSuratStore, useTranslationIdStore } from "@/lib/stores/store";
import React, { useCallback, useEffect } from "react";
import CustomDrawer from "../CustomDrawer";
import { convertToArabicNumbers } from "@/lib/latinToArabic";
import { Timeline, TimelineEntry } from "../ui/timeline";
import { usePathname } from "next/navigation";

const SingleSurat = ({ id }: { id: string }) => {
  const { fetchSingleSurat, singleSurat, translationOpen, loading } =
    useSingleSuratStore();
  const { translationId } = useTranslationIdStore();
  const lang = usePathname().split("/")[1];

  const fetchData = useCallback(() => {
    if (
      singleSurat?.number_of_surah.toString() !== id ||
      translationId !== lang
    ) {
      fetchSingleSurat(translationId, id);
    }
  }, [fetchSingleSurat, id, singleSurat, translationId, lang]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ayatData = singleSurat?.verses.map((vers) => {
    return {
      title: convertToArabicNumbers(vers.number),
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-5xl max-sm:text-3xl max-sm:leading-relaxed max-md:leading-relaxed leading-loose max-sm:font-light font-arabic text-right">
            {vers.text}
          </p>

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
              title={`Q.S. (${singleSurat.name}) ${singleSurat.number_of_surah}:${vers.number}`}
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
              title={`Q.S. (${singleSurat.name}) ${singleSurat.number_of_surah}:${vers.number}`}
              content={singleSurat?.tafsir.id.kemenag.text[vers.number]}
            />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        {singleSurat !== undefined && !loading ? (
          <Timeline
            data={ayatData as TimelineEntry[]}
            customData={{
              title: `${singleSurat.name} (${singleSurat.number_of_ayah} ${
                translationId === "en" ? "Verses" : "Ayat"
              })`,
              description:
                translationId === "id"
                  ? singleSurat.name_translations.id
                  : translationId === "en"
                  ? singleSurat.name_translations.en
                  : singleSurat.name_translations.ar,
            }}
          />
        ) : (
          <div className="mt-20">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SingleSurat;
