"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddQuestion from "@/reuseables/add-question";
import DeleteLabQuestionsButton from "@/reuseables/delete-lab-questions";
import QuestionHolder from "@/reuseables/question-holder";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface pageProps {
  labId: string;
}

const CheckSeeded = ({ labId }: pageProps) => {
  const [questions] = trpc.seed.getQuestionsAnswers.useSuspenseQuery({ labId });

  if (questions.length === 0) {
    return <div>There is not question for this lab</div>;
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
            <DeleteLabQuestionsButton labId={labId} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {questions.map((question) => (
              <QuestionHolder question={question} key={question.question.id} />
            ))}
          </div>
          <AddQuestion labId={labId} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CheckSeeded;
