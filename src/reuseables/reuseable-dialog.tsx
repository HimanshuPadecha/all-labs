import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface pageProps {
  open: boolean;
  setOpen: (open: any) => void;
  description : string,
  onClick : () => void,
  isLoading : boolean
}

const ReuseableDialog = ({ open, setOpen, description, onClick,isLoading }: pageProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen((open: boolean) => !open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-end">
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => setOpen(false)}
              className="cursor-pointer text-xs"
            >
              CANCEL
            </Button>
            <Button
              variant={"destructive"}
              className="cursor-pointer flex items-center justify-center gap-2 text-xs"
              onClick={onClick}
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2Icon className="animate-spin" />
              )}
              DELETE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReuseableDialog;
