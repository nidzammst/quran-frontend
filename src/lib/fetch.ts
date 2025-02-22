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
    console.error("Error fetching surat list:", error);
    return undefined;
  }
};
