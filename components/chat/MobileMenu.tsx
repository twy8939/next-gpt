import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
