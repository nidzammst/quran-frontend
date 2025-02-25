import SingleSurat from "@/components/page/SingleSurat";
import { SwipeNavigator } from "@/components/page/SwipeNavigator";
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

  const routes = [
    (Number(surat) - 1).toString(),
    surat,
    (Number(surat) + 1).toString(),
  ];

  return (
    <SwipeNavigator routes={routes}>
      <div className="text-white relative">
        <SingleSurat id={surat} />
      </div>
    </SwipeNavigator>
  );
};

export default page;
