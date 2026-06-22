import { Button, Flex, Input, Separator, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../../../components/atoms/PrimaryCombobox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/features/battleLog/hooks/UseFetchLrigList";
import { toaster } from "../../../components/ui/toaster";
import BattleResult from "../components/BattleResult";
import type { BattleLog } from "../types/BattleLog";
import { Link, useParams } from "react-router";
import useFetchBattleLog from "@/features/battleLog/hooks/UseFetchBattleLog";
import updateBattleLog from "@/features/battleLog/api/updateBattleLog";
import React from "react";
import { useNavigate } from "react-router";
import PrimaryScrollArea from "../../../components/atoms/PrimaryScrollArea";

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
    <Flex as="form" onSubmit={onSubmit} direction="column" h="full">
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
        <Button onClick={() => append({ lrig: "", playFirst: "1", result: "1" })} disabled={isSubmitting}>
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

export default Edit;
