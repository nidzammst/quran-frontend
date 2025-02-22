import QuranPage from "@/components/page/SuratList";

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
      <QuranPage translationId={translationId} />
    </div>
  );
};

export default page;
