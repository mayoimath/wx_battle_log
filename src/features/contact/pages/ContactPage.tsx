import { toaster } from "@/components/ui/toaster";
import { supabase } from "@/lib/supabaseClient";
import { Button, Text, Field, Flex, Stack, Textarea, NativeSelect } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";

const formSchema = z.object({
  category: z.string().min(1, { message: "種別を選択してください。" }),
  content: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { category: "0", content: "" } });
  const navigate = useNavigate();
  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("contacts").insert({
      category: Number(values.category),
      content: values.content,
    });
    if (error) {
      toaster.create({ title: "送信失敗", type: "error", description: "時間をおいて再送してください。" });
      return;
    }
    toaster.create({ title: "送信しました。", type: "success" });
    navigate("/");
  };

  return (
    <Flex justify="center" px={12} align="center" as="form" h="full">
      <Stack width={{ base: "100%", md: "50%" }} gap={4}>
        <Field.Root invalid={!!errors.category}>
          <Field.Label>お問い合わせ種別</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...register("category")}>
              <option value="0">ご意見・ご要望</option>
              <option value="1">不具合報告</option>
              <option value="2">その他</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {errors?.category && <Field.ErrorText>{errors.category.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={!!errors.content}>
          <Field.Label>お問い合わせ内容</Field.Label>
          <Textarea {...register("content")} placeholder="お問い合わせ内容を入力してください。" />
          {errors.content && <Field.ErrorText>{errors.content.message}</Field.ErrorText>}
        </Field.Root>
        {errors.root && (
          <Text color="red.400" m={4}>
            {errors.root.serverError.message}
          </Text>
        )}
        <Flex justifyContent="space-around" p="4" gap="4">
          <Button onClick={handleSubmit(onSubmit)}>送信</Button>
          <Button asChild>
            <Link to="/">戻る</Link>
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ContactPage;
