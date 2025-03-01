"use client";

import { fetchSingleHadits } from "@/lib/fetch";
import { Rawi, SingleHaditsResponse } from "@/lib/hadits-model";
import React, { useEffect, useState } from "react";

const SingleHaditsPage = ({ hadits, rawi }: { hadits: string; rawi: Rawi }) => {
  const [haditsStore, setHaditsStore] = useState<SingleHaditsResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const haditsData = await fetchSingleHadits(rawi, hadits);

      setHaditsStore(haditsData);
    };

    fetchData();
  }, [rawi, hadits]);

  return (
    <div className="mt-32 text-white container mx-auto">
      {haditsStore ? (
        <div>
          <h1 className="text-right font-bold text-4xl font-arabic">
            {haditsStore.arab}
          </h1>
          <p className="text-xl mt-6">&quot;{haditsStore.id}&quot;</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default SingleHaditsPage;
