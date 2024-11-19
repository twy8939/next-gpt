import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

export default function AutoResizingTextarea({
  value,
  ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      className="min-h-[20px] max-h-[200px]"
      {...others}
    />
  );
}
