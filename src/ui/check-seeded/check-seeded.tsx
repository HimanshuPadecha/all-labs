"use client";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";
import { trpc } from "@/trpc/client";
import AddQuestion from "@/ui/reuseables/add-question";
import DeleteLabQuestionsButton from "@/ui/reuseables/delete-lab-questions";
import NoQuestions from "@/ui/reuseables/no-questions";
import QuestionHolder from "@/ui/reuseables/question-holder";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface pageProps {
  labId: string;
  variant: "admin" | "client";
}

const CheckSeeded = ({ labId, variant }: pageProps) => {
  const [questions] = trpc.seed.getQuestionsAnswers.useSuspenseQuery({ labId });

  const {setOpenMobile} = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [])

  if (questions.length === 0) {
    return <NoQuestions variant={variant} />;
  }
  const { name: subjectName } = questions[0]?.subject;
  const { name: labName, labNo } = questions[0]?.lab;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 max-w-[1200px] mx-auto pb-12 mt-4 px-4 md:px-8 w-full"
        >
          <motion.div variants={itemVariants} className="py-7 flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold flex items-center gap-3 flex-wrap">
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {labNo}. {labName}
                </span>
                <Badge variant={"secondary"} className="text-sm px-3 py-1 shadow-sm">{subjectName}</Badge>
              </span>
            </div>
            {variant === "admin" && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DeleteLabQuestionsButton labId={labId} />
              </motion.div>
            )}
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-5 w-full">
            <AnimatePresence mode="popLayout">
              {questions.map((question) => (
                <motion.div
                  key={question.question.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="w-full"
                >
                  <QuestionHolder
                    question={question}
                    variant={variant}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {variant === "admin" && (
            <motion.div variants={itemVariants} className="mt-4 w-full">
              <AddQuestion labId={labId} />
            </motion.div>
          )}
        </motion.div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CheckSeeded;
