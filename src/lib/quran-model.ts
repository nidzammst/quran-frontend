type NameTranslation = {
  ar: string;
  en: string;
  id: string;
};

type Recitations = {
  name: string;
  audio_url: string;
};

export type Verse = {
  number: number;
  text: string;
  translation_en?: string;
  translation_id?: string;
};

export type SuratResponse = {
  name: string;
  name_translations: NameTranslation;
  number_of_ayah: number;
  number_of_surah: number;
  place?: string;
  recitation?: string;
  type?: string;
  url?: string;
};

interface TafsirText {
  [key: string]: string;
}

interface TafsirSource {
  name: string;
  source: string;
  text: TafsirText;
}

interface TafsirID {
  id: {
    kemenag: TafsirSource;
  };
}

export interface OneSuratResponse extends SuratResponse {
  recitations: Recitations[];
  type: string;
  verses: Verse[];
  tafsir: TafsirID;
}

export type GetAyatResponse = {
  number: number;
  text: string;
  translation_en: string;
  translation_id: string;
};

export enum TranslationId {
  AR,
  ID,
  EN,
}

export type SearchAyatQuery = {
  query: string;
  page: number;
  size: number;
  translationId: TranslationId;
};
