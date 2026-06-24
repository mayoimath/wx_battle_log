import { Button, Flex, Input, Separator, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../../../components/atoms/PrimaryCombobox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/features/battleLog/hooks/UseFetchLrigList";
import BattleResult from "../components/BattleResult";
import type { BattleLog } from "../types/BattleLog";
import { Link } from "react-router";
import React from "react";
import PrimaryScrollArea from "../../../components/atoms/PrimaryScrollArea";

type Props = {
  battleLog: BattleLog | undefined;
  onSubmit: (data: BattleLog) => Promise<void>;
};

const BattleLogForm = ({ battleLog, onSubmit }: Props) => {
  const lrigList = useFetchLrigList();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BattleLog>({
    values: battleLog,
  });

  const { fields, append, remove } = useFieldArray({
    name: "battles",
    control,
  });

  const defaultLog = { lrig: "", playFirst: "1", result: "1" };

  return (
    <Flex as="form" onSubmit={handleSubmit(onSubmit)} direction="column" h="full">
      <Flex mx={4} my={2} gap={2} wrap="wrap">
        <Input {...register("title")} placeholder="タイトル" width={{ base: "100%", md: "50%" }} />
        <Controller
          render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" width="250px" />}
          name="lrig"
          control={control}
        />
      </Flex>
      <Separator />
      <PrimaryScrollArea flex="1">
        <Stack p={4}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <BattleResult index={index} lrigList={lrigList!} control={control} onRemove={() => remove(index)} />
              <Separator />
            </React.Fragment>
          ))}
        </Stack>
      </PrimaryScrollArea>
      <Flex p={4} gap={4}>
        <Button onClick={() => append(defaultLog)} disabled={isSubmitting}>
          行追加
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          更新
        </Button>
        <Button asChild disabled={isSubmitting}>
          <Link to="/">戻る</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default BattleLogForm;
