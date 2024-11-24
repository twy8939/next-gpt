"use client";

import React, { useEffect, useRef } from "react";
import Empty from "./Empty";
import Message from "./Message";
import AutoResizingTextarea from "./AutoResizingTextarea";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useChat } from "ai/react";
import { useModelStore } from "@/store/model";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constants/routes";

export default function Chat() {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async (message) => {
      if (!params.conversationId) {
        // 새로운 대화 페이지
        // 1. create conversation
        const conversation = await createConversation(input);
        // 2. add messages
        await addMessages({
          conversationId: conversation.id,
          userContent: input,
          assistantContent: message.content,
        });

        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
      } else {
        // 기존 대화 페이지
        // 1. add messages
      }
    },
  });
  const model = useModelStore((store) => store.model);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅 영역 */}
      <div className="flex-1">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} name="user" {...message} />
            ))}
          </>
        )}
      </div>
      {/* input 영역 */}
      <div className="sticky bottom-0 pb-5 bg-white">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e, { data: model })}
        >
          <AutoResizingTextarea value={input} onChange={handleInputChange} />
          <Button type="submit" size={"icon"}>
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
