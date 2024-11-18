import Image from "next/image";
import React from "react";

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image width={50} height={50} src={"/logo.png"} alt="empty" />
      <h3 className="text-xl font-bold md:text-2xl">무엇을 도와드릴까요?</h3>
    </div>
  );
}
