"use client";

import Link from "next/link";
import React, { ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";

type Props = {
  item: {
    id: string;
    label: string;
    icon: ReactNode;
    href: string;
  };
};

export default function SidebarItem({ item }: Props) {
  const { id, label, href, icon } = item;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState("");
  const setOpen = useSheetStore((state) => state.setOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clickEdit = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "flex items-center justify-between p-3 text-sm rounded-lg group hover:text-white hover:bg-white/10",
        isMenuOpen || pathname === href
          ? "text-white bg-white/10"
          : "text-zinc-400"
      )}
      onClick={() => setOpen(false)}
    >
      <div className="flex items-center gap-2">
        {icon}{" "}
        {isEditMode ? (
          <input
            className="px-2 py-1 bg-transparent border rounded-lg border-zinc-400"
            value={value}
            onClick={(e) => e.stopPropagation()}
            onChange={handleChange}
          />
        ) : (
          <div className="truncate w-[180px]">{label}</div>
        )}
      </div>
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis
                className={cn(
                  "group-hover:block text-gray-400 hover:text-white",
                  isMenuOpen ? "block text-white" : "md:hidden text-gray-400"
                )}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2" onClick={(e) => clickEdit(e)}>
              <Pencil size={10} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Trash size={10} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
