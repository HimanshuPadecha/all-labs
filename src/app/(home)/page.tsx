import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

const Page = () => {
  return (
    <HydrateClient>
      <div>
        This is home home
        <Link href={"/admin/seed/seed-questions"}>
          <Button className="cursor-pointer">Seed questions</Button>
        </Link>
      </div>
    </HydrateClient>
  );
};

export default Page;
