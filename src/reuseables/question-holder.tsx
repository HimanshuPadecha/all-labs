import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { seedRouter } from "@/trpc-procedures-types/types";
import { trpc } from "@/trpc/client";
import { CircleCheckIcon, CopyIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ReuseableDialog from "./reuseable-dialog";
import { isNotNumber } from "@/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface pageProps {
  question: seedRouter["getQuestionsAnswers"][number];
}

const QuestionHolder = ({ question }: pageProps) => {
  const { question: que, answer } = question;
  const [showQuestionEditButton, setShowQuestionEditButton] = useState(false);
  const [showAnswerEditButton, setShowAnswerEditButton] = useState(false);
  const [editQuestion, setEditQuestion] = useState<boolean>();
  const [questionState, setQuestionState] = useState(que.questionText);
  const [questionNoState, setQuestionNoState] = useState<string>(
    String(que.questionNo),
  );
  const [editAnswer, setEditAnswer] = useState(false);

  const [isAnswerCopied, setIsAnswerCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(answer?.answerText || "");
    setIsAnswerCopied(true);
    setInterval(() => setIsAnswerCopied(false), 3000);
  };

  const editHandler = () => {
    if (!editQuestion) {
      setEditQuestion(true);
    } else {
      if (Number(questionNoState) <= 0 || isNotNumber(questionNoState)) {
        toast.error("Invalid Question No.", {
          position: "top-center",
        });
        return;
      }

      if (
        que.questionNo === Number(questionNoState) &&
        que.questionText === questionState
      ) {
        toast.warning("Change something to edit question.", {
          position: "top-center",
        });
        return;
      }

      editMutation.mutate({
        questionId: que.id,
        questionNo: Number(questionNoState),
        questionText: questionState,
      });
    }
  };

  const editAnswerHandler = () => {
    if (!editAnswer) {
      setEditAnswer(true);
    } else {
      if (answer?.answerText === answerState) {
        toast.warning("Edit something to Commit !!", {
          position: "top-center",
        });
        return;
      }
      editMutationAnswer.mutate({
        answerId: answer?.id,
        answerText: answerState,
        questionId: question.question.id,
      });
    }
  };

  const utils = trpc.useUtils();

  const editMutation = trpc.admin.EditQuestion.useMutation({
    onSuccess: () => {
      utils.seed.getQuestionsAnswers.invalidate({ labId: question.lab.id });
      toast.success("Question Edited successfully !!", {
        position: "top-center",
      });
      setEditQuestion(false);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  const [open, setOpen] = useState(false);
  const [answerState, setAnswerState] = useState<string>(
    answer?.answerText || "",
  );
  const deleteQuestion = trpc.admin.deleteQuestion.useMutation({
    onSuccess: () => {
      utils.seed.getQuestionsAnswers.invalidate({ labId: question.lab.id });
      toast.success("Question deleted successfully !", {
        position: "top-center",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setOpen(false);
    },
  });

  const editMutationAnswer = trpc.admin.EditAnswer.useMutation({
    onSuccess: () => {
      utils.seed.getQuestionsAnswers.invalidate({ labId: question.lab.id });
      toast.success("Answer edited !!", { position: "top-center" });
      setEditAnswer(false);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  const dialogOnClick = () => deleteQuestion.mutate({ questionId: que.id });

  return (
    <div className="w-full flex flex-col gap-3">
      <ReuseableDialog
        open={open}
        setOpen={setOpen}
        description="This action cannot be undone. This will permanently delete this
            question from everywhere."
        isLoading={deleteQuestion.isPending}
        onClick={dialogOnClick}
      />

      <div
        className="relative flex items-center justify-start"
        onMouseEnter={() => setShowQuestionEditButton(true)}
        onMouseLeave={() => setShowQuestionEditButton(false)}
      >
        {editQuestion ? (
          <div className="w-full flex items-center justify-start gap-2">
            <Input
              value={questionNoState}
              onChange={(e) => setQuestionNoState(e.target.value)}
              className="w-14"
            />
            <Textarea
              value={questionState}
              onChange={(e) => setQuestionState(e.target.value)}
              className="resize-none overflow-y-auto"
            />
          </div>
        ) : (
          <p className="whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
            <span className="font-bold text-xl">{que.questionNo}</span>.{" "}
            {que.questionText}
          </p>
        )}
        <div
          className={cn(
            "absolute flex transition-all ease-out gap-3",
            showQuestionEditButton || editQuestion
              ? "right-3 opacity-100"
              : "right-[35px] opacity-0",
          )}
        >
          <Button
            variant={editQuestion ? "destructive" : "ghost"}
            className={cn("text-xs cursor-pointer")}
            onClick={editHandler}
            disabled={editMutation.isPending}
          >
            {editQuestion ? (
              <span className="flex items-center justify-center gap-1">
                {editMutation.isPending && (
                  <Loader2Icon className="animate-spin" />
                )}{" "}
                CONFIRM CHANGES
              </span>
            ) : (
              "EDIT"
            )}
          </Button>
          {editQuestion && (
            <Button
              variant={"secondary"}
              onClick={() => setEditQuestion(false)}
              className="text-xs cursor-pointer"
            >
              CANCLE
            </Button>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-center relative"
        onMouseEnter={() => {
          setShowAnswerEditButton(true);
        }}
        onMouseLeave={() => setShowAnswerEditButton(false)}
      >
        <div
          className={cn(
            "absolute right-2 transition-all ease-in",
            showAnswerEditButton
              ? "top-2 opacity-100"
              : "top-[-30px] opacity-0",
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={handleCopy}>
                {isAnswerCopied ? <CircleCheckIcon /> : <CopyIcon />}
              </Button>
            </TooltipTrigger>
            {showAnswerEditButton && (
              <TooltipContent>
                {isAnswerCopied ? "Copied" : "Copy to Clipboard"}
              </TooltipContent>
            )}
          </Tooltip>
        </div>
        <Textarea
          value={answerState}
          readOnly={!editAnswer}
          className="resize-none overflow-y-auto py-5"
          onChange={(e) => setAnswerState(e.target.value)}
        />
        <div
          className={cn(
            `absolute right-2 flex gap-3 transition-all ease-in-out`,
            showAnswerEditButton
              ? "bottom-[10px] opacity-100"
              : "bottom-[-35px] opacity-0",
          )}
        >
          <Button
            variant={editAnswer ? "destructive" : "secondary"}
            className="cursor-pointer text-xs"
            onClick={editAnswerHandler}
            disabled={editMutationAnswer.isPending}
          >
            {editAnswer ? (
              <span className="flex items-center justify-center gap-1">
                {editMutationAnswer.isPending && (
                  <Loader2Icon className="animate-spin" />
                )}{" "}
                CONFIRM CHANGES
              </span>
            ) : (
              "EDIT"
            )}
          </Button>
          {!editAnswer ? (
            <Button
              variant={"destructive"}
              className="cursor-pointer text-xs"
              onClick={() => setOpen(true)}
            >
              DELETE QUESTION
            </Button>
          ) : (
            <Button
              className="text-xs"
              onClick={() => {
                setEditAnswer(false);
                setAnswerState(answer?.answerText || answerState);
              }}
              variant={"secondary"}
            >
              CANCEL CHANGES
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionHolder;
