import { Button, Field, Flex, Input, Separator, Stack, Text } from "@chakra-ui/react";
import PrimaryCombobox from "../../../components/atoms/PrimaryCombobox";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/features/battleLog/hooks/UseFetchLrigList";
import BattleResult from "../components/BattleResult";
import { battleLogSchema, type BattleLog } from "../types/BattleLog";
import { Link } from "react-router";
import React from "react";
import PrimaryScrollArea from "../../../components/atoms/PrimaryScrollArea";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  battleLog: BattleLog | undefined;
  onSubmit: (data: BattleLog) => Promise<void>;
  operation: "登録" | "更新";
};

const BattleLogForm = ({ battleLog, onSubmit, operation }: Props) => {
  const lrigList = useFetchLrigList();

  const methods = useForm<BattleLog>({
    resolver: zodResolver(battleLogSchema),
    values: battleLog,
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    trigger,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "battles",
    control,
  });

  const defaultLog = { lrig: "", playFirst: "1", result: "1" };

  const detailError = !Array.isArray(errors.battles) ? errors.battles?.message : null;
  return (
    <FormProvider {...methods}>
      <Flex as="form" onSubmit={handleSubmit(onSubmit)} direction="column" h="full">
        <Flex mx={4} my={2} gap={2} wrap="wrap">
          <Field.Root invalid={!!errors.title}>
            <Input {...register("title")} placeholder="タイトル" width={{ base: "100%", md: "50%" }} />
            {errors.title && <Field.ErrorText>{errors.title.message}</Field.ErrorText>}
          </Field.Root>
          <Field.Root invalid={!!errors.lrig}>
            <Controller
              render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" width="250px" />}
              name="lrig"
              control={control}
            />
            {errors.lrig && <Field.ErrorText>{errors.lrig.message}</Field.ErrorText>}
          </Field.Root>
        </Flex>
        <Separator />
        {detailError && (
          <Text color="red.400" m={4}>
            {detailError}
          </Text>
        )}
        <PrimaryScrollArea flex="1">
          <Stack p={4}>
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <BattleResult
                  index={index}
                  lrigList={lrigList!}
                  onRemove={() => {
                    remove(index);
                    trigger();
                  }}
                />
                <Separator />
              </React.Fragment>
            ))}
          </Stack>
        </PrimaryScrollArea>
        <Flex p={4} gap={4}>
          <Button
            onClick={() => {
              trigger();
              append(defaultLog);
            }}
            disabled={isSubmitting}
          >
            行追加
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {operation}
          </Button>
          <Button asChild disabled={isSubmitting}>
            <Link to="/">戻る</Link>
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default BattleLogForm;
