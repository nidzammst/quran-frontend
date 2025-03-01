// stores/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchSingleSurat, fetchSuratListData } from "../fetch";
import { OneSuratResponse, SuratResponse } from "../quran-model";

interface SuratListStore {
  suratListData: SuratResponse[] | undefined;
  loading: boolean;
  fetchSuratListData: () => Promise<void>;
}

interface SingleSuratStore {
  singleSurat: OneSuratResponse | undefined;
  loading: boolean;
  fetchSingleSurat: (
    translation: "id" | "en" | "ar",
    suratNumber: string
  ) => Promise<void>;
  translationOpen: boolean;
  setTranslationOpen: () => void;
  customDrawerOpen: boolean;
  setCustomDrawerOpen: () => void;
  horizontalSwipe: boolean;
  setHorizontalSwipe: () => void;
}

interface SiteSettingsStore {
  translationId: "id" | "en" | "ar";
  setTranslationId: (translationId: "id" | "en" | "ar") => void;
  theme: "light" | "dark" | "system";
  setThemeStore: (theme: "light" | "dark" | "system") => void;
  ayatSaved: { surat: string; ayat: string };
  saveAyatData: (data: { surat: string; ayat: string }) => void;
  sheetSaved: number;
  setSheetSaved: (sheet: number) => void;
}

const getUrlSearch = () => {
  if (typeof window !== "undefined" && window.location) {
    return window.location.pathname.split("/")[1] as "id" | "en" | "ar";
  } else {
    return "id";
  }
};

export const useQuranStore = create<SuratListStore>()(
  persist(
    (set) => ({
      suratListData: [],
      loading: true,

      fetchSuratListData: async () => {
        try {
          const data = await fetchSuratListData();
          set({ suratListData: data, loading: false });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "quran-list",
      partialize: (state) => ({ suratListData: state.suratListData }),
    }
  )
);

export const useSingleSuratStore = create<SingleSuratStore>()((set) => ({
  singleSurat: undefined,
  loading: true,
  translationOpen: false,
  setTranslationOpen: () =>
    set((state) => ({ translationOpen: !state.translationOpen })),
  customDrawerOpen: false,
  setCustomDrawerOpen: () =>
    set((state) => ({ customDrawerOpen: !state.customDrawerOpen })),
  horizontalSwipe: true,
  setHorizontalSwipe: () =>
    set((state) => ({ horizontalSwipe: !state.horizontalSwipe })),
  fetchSingleSurat: async (translation, suratNumber) => {
    try {
      const data = await fetchSingleSurat(translation, suratNumber);
      set({ singleSurat: data, loading: false });
      return;
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));

export const useSiteSettingsStore = create<SiteSettingsStore>()(
  persist(
    (set) => ({
      translationId: getUrlSearch(),
      setTranslationId: (id: "id" | "en" | "ar") => set({ translationId: id }),
      theme: "system",
      setThemeStore: (theme: "light" | "dark" | "system") => set({ theme }),
      ayatSaved: { surat: "", ayat: "" },
      saveAyatData: (data) => set(() => ({ ayatSaved: data })),
      sheetSaved: 0,
      setSheetSaved: (sheet: number) => set({ sheetSaved: sheet }),
    }),
    {
      name: "quran-data-store",
      partialize: (state) => ({
        ayatSaved: state.ayatSaved,
        sheetSaved: state.sheetSaved,
      }),
    }
  )
);
