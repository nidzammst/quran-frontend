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

const Page = async ({ params }: { params: { translationId: string } }) => {
  const { translationId } = await params;

  return (
    <div className="text-white">
      <QuranPage translationId={translationId} />
    </div>
  );
};

export default Page;
