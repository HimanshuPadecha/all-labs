"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  FileText,
  GraduationCap,
  LogIn,
  LogOut,
  Rocket,
} from "lucide-react";

interface sidebarProps {
  variant: "admin" | "client";
}

export function AppSidebar({ variant }: sidebarProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [subjects] = trpc.seed.getAllSubjectsAndLabs.useSuspenseQuery();
  const { labId } = useParams();
  const pathname = usePathname();
  const isSeedPage = pathname === "/admin/seed/seed-questions";

  // if (!isLoaded) return <div>Loading....</div>;

  return (
    <Sidebar className="border-r shadow-sm">
      <SidebarHeader className="w-full flex flex-col items-start px-5 py-6 border-b relative">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-primary p-2.5 rounded-xl shadow-sm text-primary-foreground">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg leading-tight">
              MCA Notes
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {variant === "admin" ? "Admin" : "Client"} Dashboard
            </span>
          </div>
        </div>
        {/* We keep the trigger exactly where it was to prevent breaking layout */}
        <SidebarTrigger className="absolute right-[-40px] top-6 shadow-md border bg-background" />
      </SidebarHeader>

      <SidebarContent className="px-3 pt-6 pb-4">
        {/* Call to Action Button */}
        <div className="px-2 mb-6">
          <Link
            href="/admin/seed/seed-questions"
            className="block w-full outline-none"
          >
            {variant === "admin" && (
              <Button
                className={cn(
                  "w-full flex items-center justify-center gap-2 h-12 rounded-xl transition-all shadow-md active:scale-95",
                  isSeedPage
                    ? "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary ring-2 ring-primary ring-offset-2"
                    : "bg-primary/90 text-primary-foreground hover:bg-primary hover:scale-[1.02]",
                )}
              >
                <Rocket className="w-5 h-5" />
                <span className="font-bold text-base tracking-wide">
                  Seed Content
                </span>
              </Button>
            )}
          </Link>
        </div>

        <div className="mb-3 px-3 text-xs font-bold text-muted-foreground/70 uppercase tracking-widest">
          Course Modules
        </div>

        {subjects.length === 0 ? (
          <div className="text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-xl mx-2">
            No subjects found
          </div>
        ) : (
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {subjects.map((subject) => (
              <AccordionItem
                key={subject.id}
                value={subject.id}
                className="border border-muted/40 bg-muted/10 rounded-xl overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-muted/30 transition-all [&[data-state=open]>div>svg]:text-primary">
                  <div className="flex items-center gap-3 text-left">
                    <BookOpen className="w-4 h-4 text-muted-foreground transition-colors shrink-0" />
                    <span className="text-sm font-semibold">
                      {subject.name}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-1 px-2 flex flex-col gap-1">
                  {subject.labs.length === 0 && (
                    <div className="text-xs text-muted-foreground text-center py-3 bg-muted/20 rounded-lg mx-2">
                      No labs added
                    </div>
                  )}
                  {subject.labs.map((lab) => (
                    <Link
                      key={lab.id}
                      href={variant === "admin" ? `/admin/seed/check-seeded/${lab.id}` : `/labs/${lab.id}`}
                      className="outline-none"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200",
                          labId && labId === lab.id
                            ? "bg-primary text-primary-foreground font-medium shadow-md translate-x-1"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1",
                        )}
                      >
                        <FileText
                          className={cn(
                            "w-4 h-4 shrink-0",
                            labId === lab.id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground/50",
                          )}
                        />
                        <span className="truncate flex-1">
                          Lab {lab.labNo}: {lab.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 pb-6 mt-auto border-t">
        <div className="bg-muted/30 p-4 rounded-xl border border-muted/50 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
              {variant === "admin"
                ? "AD"
                : isSignedIn
                  ? user.firstName?.charAt(0)
                  : "GUEST".charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold leading-tight truncate">
                {variant === "admin"
                  ? "ADMIN USER"
                  : isSignedIn
                    ? user.firstName
                    : "GUEST"}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                Manage content
              </span>
            </div>
          </div>
          {variant === "admin" || isSignedIn ? (
            <SignOutButton>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border-muted/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            </SignOutButton>
          ) : (
            <SignInButton>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border-muted/60"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
