"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export function AppSidebar() {
  const [subjects] = trpc.seed.getAllSubjectsAndLabs.useSuspenseQuery();
  const { labId } = useParams();

  console.log({ labId });

  return (
    <Sidebar>
      <SidebarHeader className="w-full flex items-center justify-center relative">
        <span className="font-bold text-2xl mt-4">🎓 MCA Lab Notes</span>
        <SidebarTrigger className="absolute right-[-40px]" />
      </SidebarHeader>
      <SidebarContent>
        <Accordion type="single" collapsible className="px-4 pt-4">
          {subjects.map((subject) => (
            <AccordionItem
              key={subject.id}
              value={subject.id}
              className="border-b-0"
            >
              <AccordionTrigger className="py-3 text-sm hover:no-underline">
                {subject.name}
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                {subject.labs.map((lab) => (
                  <Link
                    key={lab.id}
                    href={`/admin/seed/check-seeded/${lab.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className={cn(
                        "pl-8 py-1.5 text-sm text-muted-foreground rounded-md cursor-pointer transition-all duration-300 ease-in-out",
                        labId && labId === lab.id
                          ? "bg-primary/10 text-primary border-l-4 border-primary translate-x-1 font-medium"
                          : "hover:bg-accent hover:translate-x-1"
                      )}
                      key={lab.id}
                    >
                      {lab.labNo}. {lab.name}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <SignOutButton>
          <Button variant={"destructive"}>LOGOUT</Button>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
