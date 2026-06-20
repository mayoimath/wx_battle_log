import { Button, Flex, Input, Separator, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/hooks/UseFetchLrigList.ts";
import { toaster } from "../ui/toaster";
import BattleResult from "../molecules/BattleResult";
import type { BattleLog } from "@/types/BattleLog";
import insertBattleLog from "@/functions/insertBattleLog";
import { Link, useNavigate } from "react-router";
import React from "react";
import PrimaryScrollArea from "../atoms/PrimaryScrollArea";

const Create = () => {
  const battleLog: BattleLog = { title: "", lrig: "", battles: [] };
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
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (field) => {
    const { error } = await insertBattleLog(field);
    if (error) {
      toaster.create({ title: "登録失敗", type: "error" });
      return;
    }
    toaster.create({ title: "登録しました。", type: "success" });
    navigate("/");
  });
  return (
    <Flex as="form" onSubmit={onSubmit} direction="column" h="full">
      <Flex mx={4} my={2} gap={4} wrap="wrap">
        <Input {...register("title")} placeholder="タイトル" width={{ base: "100%", sm: "50%" }} />
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
        <Button onClick={() => append({ lrig: "", playFirst: "1", result: "1" })} m={4} mr={0} disabled={isSubmitting}>
          行追加
        </Button>
        <Button type="submit" m={4} mr={0} disabled={isSubmitting}>
          登録
        </Button>
        <Button m={4} asChild disabled={isSubmitting}>
          <Link to="/">戻る</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Create;
