import z from "zod";

export const loginInputSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません。"),
  password: z.string().min(6, "パスワードは6文字以上にしてください。"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
