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
  translationOpen: boolean;
  loading: boolean;
  fetchSingleSurat: (
    translation: "id" | "en" | "ar",
    suratNumber: string
  ) => Promise<void>;
  setTranslationOpen: () => void;
}

interface TranslationIdStore {
  translationId: "id" | "en" | "ar";
}

const getUrlSearch = () => {
  return window.location.pathname.split("/")[1] as "id" | "en" | "ar";
};

export const useSingleSuratStore = create<SingleSuratStore>()(
  persist(
    (set) => ({
      singleSurat: undefined,
      loading: true,
      translationOpen: false,
      setTranslationOpen: () =>
        set((state) => ({ translationOpen: !state.translationOpen })),
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
    }),
    {
      name: "single-surat",
      partialize: (state) => ({
        singleSurat: state.singleSurat,
        translationOpen: state.translationOpen,
      }),
      // storage: createJSONStorage(() => localStorage),
    }
  )
);

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

export const useTranslationIdStore = create<TranslationIdStore>()((set) => ({
  translationId: getUrlSearch(),
  setTranslationId: (id: "id" | "en" | "ar") => set({ translationId: id }),
}));
