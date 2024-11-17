"use client";

import { ChangeEvent, useActionState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormCard from "./FormCard";
import Submit from "./Submit";
import useFormValidate from "@/hooks/useFormValidate";
import { FormMessage } from "./FormMessage";
import { TLoginFormError } from "@/types/form";
import { LoginSchema } from "@/schemas/auth";
import { login } from "@/actions/login";

export default function LoginForm() {
  const [error, action] = useActionState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-4">
        {/* 이메일*/}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}