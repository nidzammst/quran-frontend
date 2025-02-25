import QuranPage from "@/components/page/SuratList";
import Image from "next/image";

export async function generateStaticParams() {
  return [
    {
      id: "id",
    },
    {
      id: "en",
    },
    {
      id: "ar",
    },
  ];
}

const page = async ({
  params,
}: {
  params: Promise<{ translationId: string }>;
}) => {
  const { translationId } = await params;

  return (
    <div className="text-white">
      <Image
        alt="al-qur'an-logo"
        height={320}
        width={320}
        src={"/quran-logo-dark.png"}
        className="items-center text-center content-center mx-auto mt-24 hidden dark:flex"
      />
      <Image
        alt="al-qur'an-logo"
        height={320}
        width={320}
        src={"/quran-logo-dark.png"}
        className="items-center text-center content-center mx-auto mt-24 dark:hidden"
      />
      <QuranPage translationId={translationId} />
    </div>
  );
};

export default page;
