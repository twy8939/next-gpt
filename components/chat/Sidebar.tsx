import React from "react";
import Logo from "./Logo";
import { MessageSquare, Plus } from "lucide-react";
import { BASE_URL } from "@/constants/routes";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";
import { getConversationsByUser } from "@/data/user";

const NEW_SIDEBAR_ITEM = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
  },
];

export default async function Sidebar() {
  const conversations = await getConversationsByUser();

  const formattedItems = [
    ...NEW_SIDEBAR_ITEM,
    ...conversations.map((conversation) => ({
      id: conversation.id,
      label: conversation.name,
      icon: <MessageSquare />,
      href: `${BASE_URL}/c/${conversation.id}`,
    })),
  ];

  return (
    <nav className="flex flex-col h-full p-3 text-white bg-black">
      <div className="flex-1 overflow-y-auto">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {formattedItems.map((item) => (
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
