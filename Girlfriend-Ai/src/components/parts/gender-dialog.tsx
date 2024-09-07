"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Male from "./male";
import Female from "./female";

const GenderDialog = () => {
  const [open, setOpen] = useState(false);

  const openDialogAfterDelay = () => {
    setTimeout(() => {
      setOpen(true);
    }, 5000);
  };

  useEffect(() => {
    openDialogAfterDelay();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>I&apos;m interested in</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-row justify-between gap-5 my-4">
          <div className="w-full border-none hover:bg-popover/50 transition-all duration-75 ease-in cursor-pointer bg-popover h-40 rounded-lg flex flex-col justify-center items-center">
            <Male />
            <p>Male</p>
          </div>
          <div className="w-full border-none hover:bg-popover/50 transition-all duration-75 ease-in cursor-pointer bg-popover h-40 rounded-lg flex flex-col justify-center items-center">
            <Female />
            <p>Female</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenderDialog;
