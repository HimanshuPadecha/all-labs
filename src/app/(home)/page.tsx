import HomeHolder from "@/ui/home/home-holder";
import { HydrateClient } from "@/trpc/server";

const Page = () => {
  return (
    <HydrateClient>
      <HomeHolder />
    </HydrateClient>
  );
};

export default Page;
