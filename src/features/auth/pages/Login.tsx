import { Button, Field, Flex, Input, Separator, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import useAuth from "../hooks/UseAuth";
import type { AuthError } from "@supabase/supabase-js";
import { loginInputSchema, type LoginInput } from "../types/LoginInput";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const onSignIn = async (field: LoginInput) => {
    const error = await signIn(field.email, field.password);
    if (error) {
      console.log(`${error.code}:${error.message}`);
      setError("root.serverError", { message: getSignInErrorMessage(error) });
      return;
    }
    toaster.create({ title: "ログイン", type: "success" });
    navigate("/");
  };
  const onSignUp = async (field: LoginInput) => {
    const error = await signUp(field.email, field.password);
    if (error) {
      console.log(`${error.code}:${error.message}`);
      setError("root.serverError", { message: getSignUpErrorMessage(error) });
      return;
    }
    toaster.create({ title: "ユーザー登録成功", type: "success" });
    navigate("/");
  };
  return (
    <Flex justify="center" px={12} align="center" as="form" h="full">
      <Stack width={{ base: "100%", md: "50%" }} gap={4}>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>メールアドレス</Field.Label>
          <Input {...register("email")} placeholder="xxxx@yy.zz" />
          {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput {...register("password")} placeholder="6文字以上" />
          {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
        </Field.Root>
        {errors.root && (
          <Text color="red.400" m={4}>
            {errors.root.serverError.message}
          </Text>
        )}
        <Button onClick={handleSubmit(onSignIn)} m="auto">
          ログイン
        </Button>
        <Separator />
        <Text whiteSpace="pre-wrap" fontSize={{ base: "xs", md: "md" }}>
          <b>※初めての方</b>
          {`は↑を入力して、登録してください。\n (登録に成功すると、そのままログインされます)`}
        </Text>
        <Button onClick={handleSubmit(onSignUp)} m="auto">
          新規登録
        </Button>
      </Stack>
    </Flex>
  );
};

export default Login;
