"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { useSheetStore } from "@/store/sheet";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <SheetTitle />
          <SheetDescription />
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
