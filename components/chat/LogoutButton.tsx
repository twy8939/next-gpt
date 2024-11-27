"use client";

import React from "react";
import { Button } from "../ui/button";
import { deleteSession } from "@/actions/sessions";

export default function LogoutButton() {
  return (
    <Button className="w-[80%]" onClick={() => deleteSession()}>
      로그아웃
    </Button>
  );
}
