import SingleSurat from "@/components/page/SingleSurat";
import React from "react";

export async function generateStaticParams() {
  const suratList: { surat: string }[] = [];

  for (let i = 1; i <= 114; i++) {
    suratList.push({ surat: i.toString() });
  }

  return suratList;
}

const page = async ({
  params,
}: {
  params: Promise<{ translationId: string; surat: string }>;
}) => {
  const { surat } = await params;

  return (
    <div className="text-white relative">
      <SingleSurat id={surat} />
    </div>
  );
};

export default page;
