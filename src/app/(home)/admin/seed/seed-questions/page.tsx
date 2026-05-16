"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SelectLabs from "@/reuseables/select-lab";
import SelectSubjects from "@/reuseables/select-subjects";
import { seedRouter } from "@/trpc-procedures-types/types";
import { trpc } from "@/trpc/client";
import { useUploadThing } from "@/utils/uploadthing";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

const Page = () => {
  const [subjects] = trpc.seed.subjects.useSuspenseQuery();

  const [subjectId, setSubjectId] = useState<string>("");
  const { data, isLoading } = trpc.seed.getValidLabIds.useQuery(
    { subjectId },
    { enabled: !!subjectId },
  );

  const [labs, setLabs] = useState<
    // { id: string; no: number; name: string; questionsCount: number }[]
    seedRouter["getValidLabIds"]
  >([]);

  useEffect(() => {
    if (data) {
      setLabs(data);
    }
  }, [data]);

  const [labId, setLabId] = useState<string>("");

  const generateAnswers = trpc.seed.answersSeed.useMutation({
    onSuccess: () => {
      toast.success("The Answers generation started in background !!", {
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success(
        "The Generation of question is started in the background !",
        { position: "top-center" },
      );
    },
    onUploadError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setFile(e.target.files[0]);
  };

  const handleGenerateQuestions = async () => {
    if (!labId || !subjectId) {
      toast.warning("No lab or no subject selected !!", {
        position: "top-center",
      });
      return;
    }

    if (file === null) {
      toast.error("No file is selected !!", { position: "top-center" });
      return;
    }

    await startUpload([file], { labId, subjectId });
  };

  return (
    <ErrorBoundary fallback={<p className="text-destructive text-center p-4">Something went wrong.</p>}>
      <Suspense fallback={<div className="flex justify-center p-8"><Loader2Icon className="animate-spin text-muted-foreground" /></div>}>
        <Card className="max-w-4xl mx-auto w-full shadow-sm">
          <CardTitle className="p-6 pb-2">
            <div className="w-full flex items-center justify-between border-b pb-4">
              <span className="text-2xl font-bold flex items-center gap-2">
                🚀 Seed Questions
              </span>
            </div>
          </CardTitle>
          <CardContent className="p-6 pt-4">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Left Column: Form Controls */}
              <div className="md:col-span-3 flex flex-col gap-6">
                
                {/* Selectors */}
                <div className="flex flex-col gap-4 bg-muted/30 p-5 rounded-xl border">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <SelectSubjects
                        setLabId={setLabId}
                        setSubjectId={setSubjectId}
                        subjectId={subjectId}
                        subjects={subjects}
                      />
                    </div>
                    <Badge
                      className="h-6 min-w-6 rounded-full px-2 tabular-nums flex items-center justify-center"
                      variant="secondary"
                    >
                      {subjects.length}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <SelectLabs
                        isLoading={isLoading}
                        labId={labId}
                        labs={labs}
                        setLabId={setLabId}
                      />
                    </div>
                    <Badge
                      className="h-6 min-w-6 rounded-full px-2 tabular-nums flex items-center justify-center"
                      variant="default"
                    >
                      {isLoading ? (
                        <Loader2Icon className="h-3 w-3 animate-spin" />
                      ) : (
                        labs.length
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Actions & Upload (Only visible if Lab is selected) */}
                {labId ? (
                  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <Link href={`/admin/seed/check-seeded/${labId}`}>
                        <Button
                          variant="secondary"
                          className="w-full"
                        >
                          Check Seeded
                        </Button>
                      </Link>
                      <Button
                        onClick={() => generateAnswers.mutate({ labId })}
                        variant="outline"
                        className="w-full"
                        disabled={generateAnswers.isPending}
                      >
                        {generateAnswers.isPending && (
                          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Seed Answers Only
                      </Button>
                    </div>

                    <div className="border-2 border-dashed rounded-xl p-5 flex flex-col gap-4 items-center bg-muted/10 transition-colors hover:bg-muted/30">
                      <div className="w-full">
                        <label className="text-sm font-medium mb-1.5 block">
                          Upload Lab Questions Image
                        </label>
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange} 
                          className="cursor-pointer bg-background"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleGenerateQuestions}
                        className="w-full shadow-sm"
                        disabled={!file || isUploading}
                        size="lg"
                      >
                        {isUploading ? (
                          <>
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            Uploading & Generating...
                          </>
                        ) : (
                          "Generate Questions"
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        ⚡ Select an image and click the button above to start the process.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground bg-muted/10 text-sm">
                    Select a subject and lab to continue
                  </div>
                )}
              </div>

              {/* Right Column: Instructions */}
              <div className="md:col-span-2 flex flex-col">
                <div className="bg-muted/30 border rounded-xl p-5 h-full">
                  <h4 className="font-semibold text-sm mb-4 border-b pb-2">
                    How to use this tool
                  </h4>
                  <div className="flex flex-col text-sm text-muted-foreground gap-4">
                    <div className="flex gap-2">
                      <span className="text-foreground font-medium">1.</span> 
                      <span>📘 Select the target subject.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-foreground font-medium">2.</span> 
                      <span>🧫 Choose the specific lab for that subject.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-foreground font-medium">3.</span> 
                      <span>🖼️ Upload an image of the lab questions and click "Generate Questions" to seed both questions and answers.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-foreground font-medium">4.</span> 
                      <span>🧩 Use "Seed Answers Only" if questions are already present.</span>
                    </div>
                    <div className="mt-2 p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium leading-relaxed">
                      📌 Note: You don't need to upload all questions at once. Multiple uploads are supported and will append to the lab.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
