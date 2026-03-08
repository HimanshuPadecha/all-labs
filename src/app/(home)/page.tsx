import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import HeroSection from "@/ui/hero-section/hero-section";
import Link from "next/link";

const Page = () => {
  return (
    <HydrateClient>
      <HeroSection />
    </HydrateClient>
  );
};

export default Page;
