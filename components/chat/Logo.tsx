import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={BASE_URL} className="flex items-center gap-2">
      <Image width={40} height={40} src={"/logo.png"} alt="logo" />
      <h1 className="text-2xl font-bold">Ghat GPT</h1>
    </Link>
  );
}