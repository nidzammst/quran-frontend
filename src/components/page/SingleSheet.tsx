"use client";

import Image from "next/image";
import React from "react";

const SingleSheet = ({ sheet }: { sheet: string }) => {
  return (
    <Image
      src={`https://raw.githubusercontent.com/nidzammst/Quran-Data/refs/heads/version-2.0/data/quran_image/${sheet}.png`}
      fill
      alt="Al-Qur'an perpage"
      className="absolute"
    />
  );
};

export default SingleSheet;
