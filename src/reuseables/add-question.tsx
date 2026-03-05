import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReuseableDialog from "./reuseable-dialog";
import { formSchema } from "@/types/form-type";
import { trpc } from "@/trpc/client";
import { isNotNumber } from "@/utils/utils";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface pageProps {
  labId: string;
}

const AddQuestion = ({ labId }: pageProps) => {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    inputRef.current?.focus();
  }, [showForm]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionNo: "",
      questionText: "",
      answerText: "",
      labId,
    },
  });

  const utils = trpc.useUtils();

  const addQuestion = trpc.admin.addQuestion.useMutation({
    onSuccess: () => {
      utils.seed.getQuestionsAnswers.invalidate({ labId });
      toast.success("Question added successfully !", {
        position: "top-center",
      });
      form.reset();
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({ data });
    if (isNotNumber(data.questionNo) || Number(data.labId) <= 0) {
      toast.error("Invalid Question Id", { position: "top-center" });
      return;
    }

    addQuestion.mutate(data);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center justify-end">
        {!showForm && (
          <Button
            onClick={() => {
              setShowForm(true);
            }}
          >
            ADD A QUESTION
          </Button>
        )}
      </div>
      {showForm && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="text-2xl py-3 font-bold">ADD A QUESTION : </h3>
          <FieldGroup>
            <div className="flex items-center justify-start gap-5">
              <Controller
                control={form.control}
                name="questionNo"
                render={({ field, fieldState }) => (
                  <Field className="max-w-32">
                    <FieldLabel>Question No.</FieldLabel>
                    <Input {...field} placeholder="ex. 1" ref={inputRef} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="questionText"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Question</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="ex. What is used to print a statement in java ?"
                      className="resize-none overflow-y-auto"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="answerText"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Answer</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="ex. System.out.println('Hello');"
                    className="resize-none overflow-y-auto"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center gap-3 justify-between">
              <div className="flex items-center justify-start">
                <Button className="text-xs" onClick={() => setShowForm(false)}>
                  CANCEL
                </Button>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => form.reset()}
                  className="text-xs"
                >
                  RESET 
                </Button>
                <Button type="submit" className="text-xs" disabled={addQuestion.isPending} >
                  {addQuestion.isPending && <Loader2Icon className="animate-spin"/>} SUBMIT
                </Button>
              </div>
            </div>
          </FieldGroup>
        </form>
      )}
    </div>
  );
};

export default AddQuestion;
