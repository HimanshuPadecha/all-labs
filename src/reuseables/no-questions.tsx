import React from 'react';
import { FileQuestion, Plus } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NoQuestions = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-6 text-center border-2 border-dashed border-muted/60 rounded-2xl bg-muted/10 animate-in fade-in duration-500">
      <div className="bg-muted/30 p-4 rounded-full mb-5 ring-1 ring-muted/50 shadow-sm">
        <FileQuestion className="w-10 h-10 text-muted-foreground/80" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
        No Questions Available
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
        It looks like there are no questions seeded for this lab yet. 
        Please generate or upload some questions to get started.
      </p>
      <Link href="/admin/seed/seed-questions">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Seed Questions
        </Button>
      </Link>
    </div>
  )
}

export default NoQuestions;