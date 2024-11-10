"use server";

import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = async (_: any, formData: FormData) => {
  // validate Fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return { errorMessage: "잘못된 입력 값이 있습니다." };

  // 사용자 존재 여부 체크
  const { email, name, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 계정이 있습니다.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(user).values({ name, email, password: hashedPassword });
  } catch (error) {
    console.error("error", error);
    return { errorMessage: "문제가 발생하였습니다." };
  }
  redirect("/login");
};
