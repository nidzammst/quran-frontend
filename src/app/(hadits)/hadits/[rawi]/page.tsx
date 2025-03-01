import RawiHaditsPage from "@/components/page/RawiHaditsPage";
import { Rawi } from "@/lib/hadits-model";
import React from "react";

const page = async ({ params }: { params: Promise<{ rawi: Rawi }> }) => {
  const { rawi } = await params;
  return (
    <div className="mt-20 text-white">
      <RawiHaditsPage rawi={rawi} />;
    </div>
  );
};

export default page;
