"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SelectLabs from "@/reuseables/select-lab";
import SelectSubjects from "@/reuseables/select-subjects";
import { seedRouter } from "@/trpc-procedures-types/types";
import { trpc } from "@/trpc/client";
import { UploadButton, useUploadThing } from "@/utils/uploadthing";
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
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <Card className="max-w-[500px]">
          <CardTitle>
            <div className="w-full flex items-center justify-center">
              <span className="text-2xl">🚀 Seed the Questions : </span>
            </div>
          </CardTitle>
          <CardContent>
            <div className="flex ">
              <div className="flex items-center justify-center flex-col gap-5 ">
                <div className="flex items-center justify-center  gap-2">
                  <SelectSubjects
                    setLabId={setLabId}
                    setSubjectId={setSubjectId}
                    subjectId={subjectId}
                    subjects={subjects}
                  />
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 tabular-nums"
                    variant={"secondary"}
                  >
                    {subjects.length}
                  </Badge>
                </div>

                <div className="flex items-center justify-center relative gap-2">
                  <SelectLabs
                    isLoading={isLoading}
                    labId={labId}
                    labs={labs}
                    setLabId={setLabId}
                  />
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 tabular-nums"
                    variant={"default"}
                  >
                    {isLoading ? (
                      <Loader2Icon className="h-3 w-3 animate-spin" />
                    ) : (
                      labs.length
                    )}
                  </Badge>
                </div>

                {labId && (
                  <div className="flex items-center justify-center flex-col gap-3">
                    <Link href={`/admin/seed/check-seeded/${labId}`}>
                      <Button
                        variant={"secondary"}
                        className="text-sm text-muted-foreground"
                      >
                        Check Seeded
                      </Button>
                    </Link>
                    <Button
                      onClick={() => generateAnswers.mutate({ labId })}
                      variant={"default"}
                      className="flex items-center justify-center text-sm"
                      disabled={generateAnswers.isPending}
                    >
                      {generateAnswers.isPending && (
                        <Loader2Icon className="animate-spin" />
                      )}
                      Generate Answers{" "}
                    </Button>
                  </div>
                )}

                <Input type="file" onChange={handleFileChange} />

                <Button onClick={handleGenerateQuestions}>
                  {isUploading && <Loader2Icon className="animate-spin" />}
                  Generate Questions{" "}
                </Button>

                <span className="text-xs text-muted-foreground">
                  ⚡ As soon as you select an image, the process starts
                  automatically. Please double-check before uploading.
                </span>
              </div>
              <div className="flex flex-col text-xs text-muted-foreground gap-3 p-4">
                <h4 className="line-clamp-2">
                  Manual to use this component :{" "}
                </h4>

                <p className="line-clamp-3">1. 📘 Select the subject.</p>
                <p className="line-clamp-3">
                  2. 🧫 Choose the lab related to the subject.
                </p>
                <p className="line-clamp-5">
                  3. 🖼️ Upload the image containing lab questions to generate
                  seed both questions and answers.
                </p>
                <p className="line-clamp-5">
                  4. 🧩 "Generate Answers" button to seed Answers only.
                </p>
                <p className="line-clamp-4">
                  📌 It is not mandatory to upload all questions in a single
                  upload.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
