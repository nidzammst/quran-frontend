import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSiteSettingsStore } from "@/lib/stores/store";
import { usePathname, useRouter } from "next/navigation";
import { Toggle } from "./ui/toggle";
import { useEffect, useState } from "react";
import { fetchSuratListData } from "@/lib/fetch";
import { OneSuratResponse, SuratResponse } from "@/lib/quran-model";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Button } from "./ui/button";

export function SearchComboBox() {
  const pathname = usePathname();
  const [suratList, setSuratList] = useState<SuratResponse[]>();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"surat" | "ayat" | "word">(
    pathname.split("/").length > 2 ? "ayat" : "surat"
  );
  const [searchSuratData, setSearchSuratData] = useState<OneSuratResponse[]>();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([page - 1, page, page + 1]);
  const [size, setSize] = useState(10);
  const { translationId } = useSiteSettingsStore();
  const router = useRouter();

  useEffect(() => {
    fetchSuratListData().then((surat) => setSuratList(surat));
  }, []);

  console.log(searchSuratData);

  useEffect(() => {
    const fetchData = async (page: number, size: number) => {
      if (type === "surat") {
        const data = await fetch(
          `https://quran-api2.vercel.app/api/${translationId}/search?surat=${search}`
        ).then((response) => response.json());
        setSearchSuratData(data.data);
      } else if (type === "word") {
        const data = await fetch(
          `https://quran-api2.vercel.app/api/${translationId}/search?terjemah=${search}&size=${size}&page=${page}`
        ).then((res) => res.json());
        setSearchSuratData(data.data);
        if (data.data.length === 0) {
          const data = await fetch(
            `https://quran-api2.vercel.app/api/ar/search?terjemah=${search}&size=${size}&page=${page}`
          ).then((res) => res.json());
          setSearchSuratData(data.data);
        }
      }
    };

    /* TODO */
    /* Search word in single surat */
    fetchData(page, size);
  }, [search, translationId, type, page, size]);

  const boldText = (ayat: string, word: string) => {
    const boldParts = ayat.split(new RegExp(`(${word})`, "i"));

    return boldParts.map((part, id) => {
      if (part.toLowerCase() === word.toLowerCase()) {
        return (
          <span key={id} className="font-bold italic">
            {part}
          </span>
        );
      }

      return part;
    });
  };
  return (
    <>
      <Command
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
          }
        }}
      >
        <div
          className={`flex flex-row gap-2 ${
            pathname.split("/").length > 2 && "hidden"
          }`}
        >
          <Toggle
            pressed={type === "surat"}
            variant="default"
            onPressedChange={() => {
              setType("surat");
            }}
            className="w-14 h-5"
          >
            <span>Surat</span>
          </Toggle>
          <Toggle
            pressed={type === "word"}
            variant="default"
            onPressedChange={() => {
              setType("word");
            }}
            className="w-14 h-5"
          >
            <span>{translationId === "id" ? "Kata" : "Word"}</span>
          </Toggle>
        </div>
        <div
          className={`flex flex-row gap-2 ${
            pathname.split("/").length <= 2 && "hidden"
          }`}
        >
          <Toggle
            pressed={type === "ayat"}
            variant="default"
            onPressedChange={() => {
              setType("ayat");
            }}
            className="w-14 h-5"
          >
            <span>
              {translationId === "id"
                ? "kata"
                : translationId === "en"
                ? "word"
                : "كلمة"}
            </span>
          </Toggle>
        </div>
        <CommandInput
          placeholder={`${
            pathname.split("/").length <= 2
              ? `${
                  translationId === "id"
                    ? "Cari Surat..."
                    : translationId === "en"
                    ? "Search Surat..."
                    : "بحث سورات..."
                }`
              : `${
                  translationId === "id"
                    ? "Cari Ayat atau terjemah..."
                    : translationId === "en"
                    ? "Search Ayat or translation..."
                    : "بحث الآية..."
                }`
          }`}
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className="h-full">
          <CommandEmpty>
            <span className="mr-12">No results found.</span>
            {translationId !== "ar" && (
              <Button onClick={() => router.push("/ar")} variant="outline">
                Search in Arabic?
              </Button>
            )}
          </CommandEmpty>

          {!searchSuratData && type === "surat"
            ? suratList?.map((surat) => (
                <CommandItem
                  key={surat.number_of_surah}
                  className="h-12 cursor-pointer"
                  onSelect={() => {
                    router.push(
                      `/${translationId}/surat/${surat.number_of_surah}`
                    );
                  }}
                  value={surat.name}
                >
                  <h3 className="font-bold">
                    {surat.name} ({surat.number_of_ayah} Ayah)
                  </h3>
                </CommandItem>
              ))
            : type === "word" &&
              searchSuratData?.map((surat, index) => (
                <CommandItem
                  key={index}
                  value={`${
                    translationId === "id"
                      ? surat.verses[0].translation_id
                      : translationId === "en"
                      ? surat.verses[0].translation_en
                      : surat.verses[0].text
                  }`}
                  className="h-24 cursor-pointer"
                  onSelect={() => {
                    router.push(
                      `/${translationId}/surat/${surat.number_of_surah}#${surat.verses[0].number}`
                    );
                  }}
                >
                  <span className="min-w-28 font-bold">
                    {surat.name} : {surat.verses[0].number}
                  </span>
                  <p>
                    {surat.verses.map((verse) => (
                      <span key={verse.number}>
                        <p className="overflow-y-hidden max-h-16">
                          {translationId === "id"
                            ? boldText(
                                surat.verses[0].translation_id as string,
                                search
                              )
                            : translationId === "en"
                            ? boldText(
                                surat.verses[0].translation_en as string,
                                search
                              )
                            : boldText(surat.verses[0].text as string, search)}
                        </p>
                      </span>
                    ))}
                  </p>
                </CommandItem>
              ))}

          {type === "surat" &&
            searchSuratData?.map((surat) => (
              <CommandItem
                key={surat.number_of_surah}
                value={surat.name_translations[translationId]}
                className="h-16 cursor-pointer"
                onSelect={() => {
                  router.push(
                    `/${translationId}/surat/${surat.number_of_surah}`
                  );
                }}
              >
                <h3 className="font-bold">{surat.name}</h3>
              </CommandItem>
            ))}
        </CommandList>

        <div className="flex flex-row gap-3 content-center">
          <div className="flex flex-row gap-2">
            <Toggle
              pressed={size === 10}
              variant="outline"
              onPressedChange={() => setSize(10)}
              className="w-full"
            >
              10
            </Toggle>
            <Toggle
              pressed={size === 20}
              variant="outline"
              onPressedChange={() => setSize(20)}
              className="w-full"
            >
              20
            </Toggle>
            <Toggle
              pressed={size === 30}
              variant="outline"
              onPressedChange={() => setSize(30)}
              className="w-full"
            >
              30
            </Toggle>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {page > 1 && (
                  <PaginationPrevious
                    onClick={() => {
                      setPage(page - 1);
                      setPages([page - 2, page - 1, page]);
                    }}
                  />
                )}
              </PaginationItem>
              {page === 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page > 3 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setPage(1);
                      setPages([0, 1, 2]);
                    }}
                    isActive={page === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              {pages.map(
                (p) =>
                  p > 0 && (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => {
                          setPage(p);
                          setPages([p - 1, p, p + 1]);
                        }}
                        isActive={p === page}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
              )}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    setPage(page + 1);
                    setPages([page, page + 1, page + 2]);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Command>
    </>
  );
}
