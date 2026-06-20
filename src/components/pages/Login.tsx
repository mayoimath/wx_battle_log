import { Button, Field, Flex, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useForm } from "react-hook-form";
import { supabase } from "@/supabase/supabaseClient";
import { useNavigate } from "react-router";
import { toaster } from "../ui/toaster";

type FormValue = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<FormValue>({ defaultValues: { email: "", password: "" } });
  const navigate = useNavigate();
  const onSubmit = (mode: "signin" | "signup") =>
    handleSubmit((field) =>
      (async () => {
        if (mode == "signin") {
          const { error } = await supabase.auth.signInWithPassword({ email: field.email, password: field.password });
          if (error) {
            console.log(error);
            if (error.code == "invalid_credentials")
              toaster.create({ title: "サインイン失敗", description: "ユーザ情報が登録されていません。", type: "error" });
            else toaster.create({ title: "サインイン失敗", description: "不明なエラー", type: "error" });
          } else {
            toaster.create({ title: "サインイン", type: "success" });
            navigate("/");
          }
        } else {
          const { error } = await supabase.auth.signUp({ email: field.email, password: field.password });
          if (error) {
            console.log(error);
            if (error.code == "invalid_credentials")
              toaster.create({ title: "サインアップ失敗", description: "ユーザ情報が登録できません。", type: "error" });
            else if (error.code == "user_already_exists")
              toaster.create({ title: "サインアップ失敗", description: "そのユーザはすでに登録されています。", type: "error" });
            else if (error.code == "validation_failed") toaster.create({ title: "サインアップ失敗", description: "形式不正です。", type: "error" });
            else if (error.code == "weak_password")
              toaster.create({ title: "サインアップ失敗", description: "パスワードが短すぎます。", type: "error" });
            else toaster.create({ title: "サインアップ失敗", description: "不明なエラー", type: "error" });
          } else {
            toaster.create({ title: "サインアップ", type: "success" });
            navigate("/");
          }
        }
      })(),
    );
  return (
    <form>
      <Flex justify="center" m={12}>
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
            <Button onClick={onSubmit("signin")}>サインイン</Button>
            <Button onClick={onSubmit("signup")}>サインアップ</Button>
          </Flex>
        </Stack>
      </Flex>
    </form>
  );
}

export default Login;
