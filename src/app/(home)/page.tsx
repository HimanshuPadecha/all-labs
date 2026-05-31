import HomeHolder from "@/home/home-holder";
import { HydrateClient } from "@/trpc/server";

const Page = () => {
  return (
    <HydrateClient>
      <HomeHolder />
    </HydrateClient>
  );
};

export default Page;
