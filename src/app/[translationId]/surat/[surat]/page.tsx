import OneQuran from "@/components/page/OneQuran";
import { SuratResponse } from "@/lib/quran-model";
import React from "react";

export async function generateStaticParams() {
  const quranList = await fetch(
    `https://quran-api2.vercel.app/api/list-surat`
  ).then((res) => res.json());

  return quranList.data.map((quran: SuratResponse) => ({
    surat: quran.number_of_surah,
  }));
}

const page = async ({
  params,
}: {
  params: Promise<{ translationId: string; surat: string }>;
}) => {
  const { translationId, surat } = await params;

  return (
    <div className="text-white">
      <OneQuran id={surat} translation={translationId} />
    </div>
  );
};

export default page;
