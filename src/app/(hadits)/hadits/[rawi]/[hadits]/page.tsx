import SingleHaditsPage from "@/components/page/SingleHaditsPage";
import React from "react";

import { Rawi } from "@/lib/hadits-model";

const page = async ({
  params,
}: {
  params: Promise<{ hadits: string; rawi: Rawi }>;
}) => {
  const { hadits, rawi } = await params;
  return <SingleHaditsPage hadits={hadits} rawi={rawi} />;
};

export default page;
