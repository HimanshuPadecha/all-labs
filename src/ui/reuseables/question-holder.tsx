import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { seedRouter } from "@/trpc-procedures-types/types";
import { trpc } from "@/trpc/client";
import { CircleCheckIcon, CopyIcon, Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ReuseableDialog from "./reuseable-dialog";
import { isNotNumber } from "@/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface pageProps {
  question: seedRouter["getQuestionsAnswers"][number];
  variant: "admin" | "client";
}

const QuestionHolder = ({ question, variant }: pageProps) => {
  const { question: que, answer } = question;
  const [showQuestionEditButton, setShowQuestionEditButton] = useState(false);
  const [showAnswerEditButton, setShowAnswerEditButton] = useState(false);
  const [showOutputEditButton, setShowOutputEditButton] = useState(false);

  const [editQuestion, setEditQuestion] = useState<boolean>();
  const [questionState, setQuestionState] = useState(que.questionText);
  const [questionNoState, setQuestionNoState] = useState<string>(
    String(que.questionNo),
  );
  const [editAnswer, setEditAnswer] = useState(false);
  const [outputText, setOutputText] = useState(answer?.outputText || "");
  const [editOutput, setEditOutput] = useState(false);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const [isAnswerCopied, setIsAnswerCopied] = useState(false);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(answer?.answerText || "");
    setIsAnswerCopied(true);
    setTimeout(() => setIsAnswerCopied(false), 3000);
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
      answerRef.current?.focus();
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

  const editOutputMutation = trpc.admin.editOutput.useMutation({
    onSuccess: () => {
      utils.seed.getQuestionsAnswers.invalidate({ labId: question.lab.id });
      toast.success("Output Edited successfully !!", {
        position: "top-center",
      });
      setEditOutput(false);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

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
    <motion.div 
      className="w-full flex flex-col gap-3 md:gap-4 p-3 md:p-5 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
      layout
    >
      <ReuseableDialog
        open={open}
        setOpen={setOpen}
        description="This action cannot be undone. This will permanently delete this question from everywhere."
        isLoading={deleteQuestion.isPending}
        onClick={dialogOnClick}
      />

      <div
        className="relative flex items-center justify-start min-h-[48px]"
        onMouseEnter={() => setShowQuestionEditButton(true)}
        onMouseLeave={() => setShowQuestionEditButton(false)}
      >
        <AnimatePresence mode="wait">
          {editQuestion ? (
            <motion.div 
              key="edit"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full flex items-center justify-start gap-2 md:gap-3 pr-24 md:pr-40"
            >
              <Input
                value={questionNoState}
                onChange={(e) => setQuestionNoState(e.target.value)}
                className="w-14 md:w-16 shadow-sm"
              />
              <Textarea
                value={questionState}
                onChange={(e) => setQuestionState(e.target.value)}
                className="resize-none overflow-y-auto shadow-sm min-h-[60px]"
              />
            </motion.div>
          ) : (
            <motion.p 
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-pre-wrap break-words overflow-hidden w-full text-sm md:text-base pr-8 md:pr-12 text-foreground/90 leading-relaxed"
            >
              <span className="font-bold text-lg md:text-xl text-primary">{que.questionNo}</span>.{" "}
              {que.questionText}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(showQuestionEditButton || editQuestion) && variant === "admin" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute right-0 flex flex-col md:flex-row gap-2 z-10 pl-2 bg-linear-to-l from-card via-card to-transparent"
            >
              <Button
                variant={editQuestion ? "destructive" : "secondary"}
                className={cn("text-[10px] md:text-xs cursor-pointer shadow-sm h-7 md:h-9 px-2 md:px-4")}
                onClick={editHandler}
                disabled={editMutation.isPending}
              >
                {editQuestion ? (
                  <span className="flex items-center justify-center gap-1 md:gap-2">
                    {editMutation.isPending && (
                      <Loader2Icon className="animate-spin size-3" />
                    )}{" "}
                    CONFIRM
                  </span>
                ) : (
                  "EDIT"
                )}
              </Button>
              {editQuestion && (
                <Button
                  variant={"ghost"}
                  onClick={() => setEditQuestion(false)}
                  className="text-[10px] md:text-xs cursor-pointer h-7 md:h-9 px-2 md:px-4"
                >
                  CANCEL
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="w-full relative rounded-xl overflow-hidden border border-border/50 bg-muted/30"
        onMouseEnter={() => setShowAnswerEditButton(true)}
        onMouseLeave={() => setShowAnswerEditButton(false)}
      >
        <AnimatePresence>
          {showAnswerEditButton && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute right-2 top-2 z-10"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8 bg-background/80 backdrop-blur-md hover:bg-background shadow-sm" onClick={handleCopy}>
                    {isAnswerCopied ? <CircleCheckIcon className="h-3 w-3 md:h-4 md:w-4 text-emerald-500" /> : <CopyIcon className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isAnswerCopied ? "Copied" : "Copy to Clipboard"}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        <Textarea
          value={answerState}
          readOnly={!editAnswer}
          className={cn(
            "w-full min-w-0 min-h-[120px] resize-y break-words py-4 px-3 md:px-5 text-xs md:text-sm font-mono bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300",
            editAnswer && "bg-background shadow-inner"
          )}
          onChange={(e) => setAnswerState(e.target.value)}
          ref={answerRef}
        />

        <AnimatePresence>
          {(showAnswerEditButton || editAnswer) && variant === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute right-2 bottom-2 flex flex-wrap justify-end gap-2 z-10"
            >
              <Button
                variant={editAnswer ? "destructive" : "secondary"}
                className="cursor-pointer text-[10px] md:text-xs shadow-sm h-7 md:h-9"
                onClick={editAnswerHandler}
                disabled={editMutationAnswer.isPending}
              >
                {editAnswer ? (
                  <span className="flex items-center justify-center gap-1 md:gap-2">
                    {editMutationAnswer.isPending && (
                      <Loader2Icon className="animate-spin size-3" />
                    )}{" "}
                    CONFIRM
                  </span>
                ) : (
                  "EDIT ANSWER"
                )}
              </Button>
              {!editAnswer ? (
                <Button
                  variant={"destructive"}
                  className="cursor-pointer text-[10px] md:text-xs shadow-sm h-7 md:h-9"
                  onClick={() => setOpen(true)}
                >
                  DELETE
                </Button>
              ) : (
                <Button
                  className="text-[10px] md:text-xs shadow-sm h-7 md:h-9"
                  onClick={() => {
                    setEditAnswer(false);
                    setAnswerState(answer?.answerText || answerState);
                  }}
                  variant={"ghost"}
                >
                  CANCEL
                </Button>
              )}
              {!answer?.outputText && (
                <Button
                  className="text-[10px] md:text-xs shadow-sm h-7 md:h-9"
                  variant="outline"
                  onClick={() => {
                    setEditOutput(true);
                    outputRef.current?.focus();
                  }}
                >
                  ADD OUTPUT
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {answer && (
        <motion.div 
          layout
          className="relative mt-1 w-full"
          onMouseEnter={() => setShowOutputEditButton(true)}
          onMouseLeave={() => setShowOutputEditButton(false)}
        >
          <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block ml-1">Output</span>
          <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-muted/20">
            <Textarea
              value={outputText === "" && !editOutput ? "N/A" : outputText}
              className={cn(
                "w-full resize-y break-words text-xs md:text-sm font-mono bg-transparent border-none py-3 px-3 md:px-5 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300 text-muted-foreground",
                editOutput ? "bg-background shadow-inner min-h-[100px] text-foreground" : "min-h-[60px]"
              )}
              readOnly={!editOutput}
              onChange={(e) => setOutputText(e.target.value)}
              ref={outputRef}
            />
            
            <AnimatePresence>
              {(showOutputEditButton || editOutput) && variant === "admin" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="absolute right-2 bottom-2 flex flex-wrap justify-end gap-2 z-10"
                >
                  {!editOutput ? (
                    <Button
                      className="text-[10px] md:text-xs cursor-pointer shadow-sm h-7 md:h-9"
                      variant={"secondary"}
                      onClick={() => {
                        setEditOutput(true);
                        outputRef.current?.focus();
                      }}
                    >
                      EDIT OUTPUT
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="text-[10px] md:text-xs cursor-pointer shadow-sm h-7 md:h-9"
                        variant={"destructive"}
                        onClick={() => {
                          if (answer?.outputText === outputText) {
                            toast.warning("Change something to edit the output.", {
                              position: "top-center",
                            });
                            return;
                          }

                          if (outputText === null) return;

                          editOutputMutation.mutate({
                            answerId: answer.id,
                            newOutputText: outputText,
                          });
                        }}
                        disabled={editOutputMutation.isPending}
                      >
                        {editOutputMutation.isPending ? (
                          <Loader2Icon className="animate-spin size-3 mr-1" />
                        ) : null}
                        CONFIRM
                      </Button>
                      <Button
                        className="text-[10px] md:text-xs cursor-pointer shadow-sm h-7 md:h-9"
                        variant={"ghost"}
                        onClick={() => {
                          setEditOutput(false);
                          setOutputText(answer?.outputText || "");
                        }}
                      >
                        CANCEL
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionHolder;
