"use client";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/trpc/client";
import AddQuestion from "@/ui/reuseables/add-question";
import DeleteLabQuestionsButton from "@/ui/reuseables/delete-lab-questions";
import NoQuestions from "@/ui/reuseables/no-questions";
import QuestionHolder from "@/ui/reuseables/question-holder";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface pageProps {
  labId: string;
  variant: "admin" | "client";
}

const CheckSeeded = ({ labId, variant }: pageProps) => {
  const [questions] = trpc.seed.getQuestionsAnswers.useSuspenseQuery({ labId });

  if (questions.length === 0) {
    return <NoQuestions />;
  }
  const { name: subjectName } = questions[0]?.subject;
  const { name: labName, labNo } = questions[0]?.lab;

  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex flex-col gap-4 max-w-[1200px] pb-12">
          <div className="py-7 flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold">
                {labNo}. {labName}{" "}
                <Badge variant={"secondary"}>{subjectName} </Badge>{" "}
              </span>
            </div>
            {variant === "admin" && <DeleteLabQuestionsButton labId={labId} />}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {questions.map((question) => (
              <QuestionHolder
                question={question}
                key={question.question.id}
                variant={variant}
              />
            ))}
          </div>
          {variant === "admin" && <AddQuestion labId={labId} />}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CheckSeeded;
