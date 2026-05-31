import { HydrateClient, trpc } from "@/trpc/server";
import CheckSeeded from "@/ui/check-seeded/check-seeded";

interface pageProps {
  params: Promise<{ labId: string }>;
}

const Page = async ({ params }: pageProps) => {
  const { labId } = await params;
  trpc.seed.getQuestionsAnswers.prefetch({ labId });
  return (
    <HydrateClient>
      <CheckSeeded labId={labId} variant="client" />
    </HydrateClient>
  );
};

export default Page;
