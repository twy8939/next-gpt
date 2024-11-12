"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (_: any, formData: FormData) => {
  // validate Fields
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return { errorMessage: "잘못된 입력 값이 있습니다." };

  // 사용자 존재 여부 체크
  const { email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        errorMessage: "존재하지 않는 사용자입니다.",
      };
    }

    const { id, name, password: userPassword } = existingUser;

    const passwordMatch = await bcrypt.compare(password, userPassword);

    // 세션 생성
    await createSession({ id, name });

    if (!passwordMatch) {
      return {
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      errorMessage: "문제가 발생하였습니다.",
    };
  }

  redirect("/");
};
