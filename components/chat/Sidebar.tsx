import React from "react";
import Logo from "./Logo";
import { MessageSquare, Plus } from "lucide-react";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";

const DUMMY_ITEMS = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: "new1",
    label:
      "새로운 긴 대화 새로운 긴 대화 새로운 긴 대화 새로운 긴 대화 새로운 긴 대화",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: "new2",
    label: "일반 대화 예시 입니다.",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/2`,
  },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col h-full p-3 text-white bg-black">
      <div className="flex-1 overflow-y-auto">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_ITEMS.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
