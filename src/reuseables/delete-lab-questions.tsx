import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface pageProps {
  labId: string;
}

const DeleteLabQuestionsButton = ({ labId }: pageProps) => {
  const utils = trpc.useUtils();
  const deleteQuestions = trpc.admin.deleteAllLabQuestion.useMutation({
    onSuccess: () => {
      toast.success("All questions deleted !!", { position: "top-center" });
      utils.seed.getQuestionsAnswers.invalidate({ labId });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return (
    <Button
      variant={"destructive"}
      className="text-xs"
      onClick={() => deleteQuestions.mutate({ labId })}
      disabled={deleteQuestions.isPending}
    >
      {deleteQuestions.isPending && <Loader2Icon className="animate-spin" />}
    DELETE ALL
    </Button>
  );
};

export default DeleteLabQuestionsButton;
