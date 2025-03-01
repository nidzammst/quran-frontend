import { HaditsDataInfo, Rawi, SingleHaditsResponse } from "./hadits-model";
import { OneSuratResponse, SuratResponse } from "./quran-model";

export const fetchSuratListData = async (): Promise<
  SuratResponse[] | undefined
> => {
  try {
    const response = await fetch(
      "https://quran-api2.vercel.app/api/list-surat"
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching surat list:", error);
    return undefined;
  }
};

export const fetchSingleSurat = async (
  translation: "id" | "en" | "ar",
  suratNumber: string
): Promise<OneSuratResponse | undefined> => {
  try {
    const response = await fetch(
      `https://quran-api2.vercel.app/api/${translation}/surat/${suratNumber}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching single surat:", error);
    return undefined;
  }
};

export const fetchHaditsInfo = async (): Promise<
  HaditsDataInfo[] | undefined
> => {
  try {
    const response = await fetch(
      `https://quran-api2.vercel.app/api/id/hadits/info`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching single surat:", error);
    return undefined;
  }
};

export const fetchSingleHadits = async (
  rawi: Rawi,
  hadits: string
): Promise<SingleHaditsResponse | undefined> => {
  try {
    const response = await fetch(
      `https://quran-api2.vercel.app/api/id/hadits/${rawi}/${hadits}`
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching single surat:", error);
    return undefined;
  }
};

export const fetchHaditsByRawi = async (
  rawi: Rawi
): Promise<SingleHaditsResponse[] | undefined> => {
  try {
    const response = await fetch(
      `https://quran-api2.vercel.app/api/id/hadits/${rawi}?size=10`
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching single surat:", error);
    return undefined;
  }
};
