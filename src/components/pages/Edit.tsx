import { Button, Flex, Input, Separator, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/hooks/UseFetchLrigList.ts";
import { toaster } from "../ui/toaster";
import BattleResult from "../molecules/BattleResult";
import type { BattleLog } from "@/types/BattleLog";
import { Link, useParams } from "react-router";
import useFetchBattleLog from "@/hooks/UseFetchBattleLog";
import updateBattleLog from "@/functions/updateBattleLog";
import React from "react";
import { useNavigate } from "react-router";

const Edit = () => {
  const { logNo } = useParams();
  const battleLog = useFetchBattleLog(Number(logNo));

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
    const { error } = await updateBattleLog(Number(logNo), field);
    if (error) {
      toaster.create({ title: "更新失敗", type: "error" });
      return;
    }

    toaster.create({ title: "更新しました。", type: "success" });
    navigate("/");
  });
  return (
    <form onSubmit={onSubmit}>
      <Flex m={4} gap={4} wrap="wrap">
        <Input {...register("title")} placeholder="タイトル" width={{ base: "100%", md: "50%" }} />
        <Controller
          render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" width="250px" />}
          name="lrig"
          control={control}
        />
      </Flex>
      <Separator />
      <Stack m={4} gapX={4}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <BattleResult index={index} lrigList={lrigList!} control={control} onRemove={() => remove(index)} />
            <Separator />
          </React.Fragment>
        ))}
      </Stack>
      <Button onClick={() => append({ lrig: "", playFirst: "1", result: "1" })} m={4} mr={0} disabled={isSubmitting}>
        追加
      </Button>
      <Button type="submit" m={4} mr={0} disabled={isSubmitting}>
        更新
      </Button>
      <Button m={4} asChild disabled={isSubmitting}>
        <Link to="/">戻る</Link>
      </Button>
    </form>
  );
};

export default Edit;
