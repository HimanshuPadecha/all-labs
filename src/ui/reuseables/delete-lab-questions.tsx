import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ReuseableDialog from "./reuseable-dialog";

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

  const dialogOnClick = () => deleteQuestions.mutate({ labId });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ReuseableDialog
        open={open}
        setOpen={setOpen}
        description="This action cannot be undone. This will permanently delete this
            question from everywhere."
        isLoading={deleteQuestions.isPending}
        onClick={dialogOnClick}
      />
      <Button
        variant={"destructive"}
        className="text-xs"
        onClick={() => setOpen(true)}
        disabled={deleteQuestions.isPending}
      >
        {deleteQuestions.isPending && <Loader2Icon className="animate-spin" />}
        DELETE ALL
      </Button>
    </>
  );
};

export default DeleteLabQuestionsButton;
