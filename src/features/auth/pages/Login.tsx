import { Button, Field, Flex, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import useAuth from "../hooks/UseAuth";
import type { AuthError } from "@supabase/supabase-js";

type FormValue = {
  email: string;
  password: string;
};

const getSignInErrorMessage = (error: AuthError) => {
  switch (error.code) {
    case "invalid_credentials":
      return "ユーザ情報が登録されていません。";
    default:
      return "不明なエラー";
  }
};

const getSignUpErrorMessage = (error: AuthError) => {
  switch (error.code) {
    case "invalid_credentials":
      return "ユーザ情報が登録できません。";
    case "user_already_exists":
      return "そのユーザはすでに登録されています。";
    case "validation_failed":
      return "入力された情報の形式に誤りがあります。";
    case "weak_password":
      return "パスワードが短すぎます。";
    default:
      return "不明なエラー";
  }
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormValue>({ defaultValues: { email: "", password: "" } });
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const onSubmit = (mode: "signin" | "signup") =>
    handleSubmit((field) =>
      (async () => {
        if (mode == "signin") {
          const error = await signIn(field.email, field.password);
          if (error) {
            toaster.create({ title: "ログイン失敗", description: getSignInErrorMessage(error), type: "error" });
            return;
          }
          toaster.create({ title: "ログイン", type: "success" });
          navigate("/");
        } else {
          const error = await signUp(field.email, field.password);
          if (error) {
            toaster.create({ title: "ユーザー登録失敗", description: getSignUpErrorMessage(error), type: "error" });
            return;
          }
          toaster.create({ title: "ユーザー登録成功", type: "success" });
          navigate("/");
        }
      })(),
    );
  return (
    <Flex justify="center" px={12} align="center" as="form" h="full">
      <Stack width={{ base: "100%", md: "50%" }}>
        <Field.Root>
          <Field.Label>メールアドレス</Field.Label>
          <Input {...register("email")} placeholder="xxxx@yy.zz" />
        </Field.Root>
        <Field.Root>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput {...register("password")} />
        </Field.Root>
        <Flex justify="space-around" m={4}>
          <Button onClick={onSubmit("signin")}>ログイン</Button>
          <Button onClick={onSubmit("signup")}>新規登録</Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;
