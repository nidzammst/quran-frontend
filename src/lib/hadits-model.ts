export type SingleHaditsResponse = {
  number: number;
  arab: string;
  id: string;
};

export enum Rawi {
  IbnuMajah = "ibnu-majah",
  Malik = "malik",
  Muslim = "muslim",
  Nasai = "nasai",
  Tirmidzi = "tirmidzi",
  AbuDawud = "abu-dawud",
  Ahmad = "ahmad",
  Bukhari = "bukhari",
  Darimi = "darimi",
}

export type HaditsDataInfo = {
  name: string;
  slug: Rawi;
  total: number;
};
