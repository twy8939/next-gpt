"use client";

import React, { useEffect, useRef, useState } from "react";
import Empty from "./Empty";
import Message from "./Message";
import AutoResizingTextarea from "./AutoResizingTextarea";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

const MESSAGE_DUMMY = [
  { id: 1, content: "hi", role: "user" },
  { id: 2, content: "hello", role: "assistant" },
];

export default function Chat() {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅 영역 */}
      <div className="flex-1">
        {MESSAGE_DUMMY.length === 0 ? (
          <Empty />
        ) : (
          <>
            {MESSAGE_DUMMY.map((message) => (
              <Message key={message.id} name="user" {...message} />
            ))}
          </>
        )}
      </div>
      {/* input 영역 */}
      <div className="sticky bottom-0 pb-5 bg-white">
        <form className="flex items-center justify-center gap-4">
          <AutoResizingTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" size={"icon"}>
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
