"use client";

import Link from "next/link";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";
import { deleteConversation, updateConversation } from "@/actions/conversation";
import toast from "react-hot-toast";
import { useModalState } from "@/store/modal";
import ModalFooter from "../modal/ModalFooter";
import { BASE_URL } from "@/constants/routes";

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
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState("");
  const [openModal, closeModal] = useModalState((state) => [
    state.openModal,
    state.closeModal,
  ]);
  const setOpen = useSheetStore((state) => state.setOpen);

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      await updateConversation(id, value);
      try {
      } catch (error) {
        console.error(error);
        toast.error("이름 수정에 실패하였습니다.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConversation(id);

      toast.success("삭제에 성공하였습니다.");

      if (params.conversationId === id) {
        router.push(BASE_URL);
      }

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("삭제에 실패하였습니다.");
    }
  };

  const clickDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    openModal({
      title: "정말 삭제하시겠습니까?",
      description: "삭제 후 데이터는 복구하기 어려울 수 있씁니다.",
      footer: <ModalFooter onConfirm={handleDelete} onCancel={closeModal} />,
    });
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);
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
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={inputRef}
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
              <Trash size={10} onClick={(e) => clickDelete(e)} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
