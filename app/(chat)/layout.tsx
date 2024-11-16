import Header from "@/components/chat/Header";
import Sidebar from "@/components/chat/Sidebar";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full md:flex">
      <div className="hidden md:block w-[300px]">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
