import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useFetchLrigList from "@/hooks/UseFetchLrigList.ts";
import { toaster } from "../ui/toaster";
import BattleResult from "../molecules/BattleResult";
import type { BattleLog } from "@/types/BattleLog";
import { Link, useParams } from "react-router";
import useFetchBattleLog from "@/hooks/UseFetchBattleLog";
import updateBattleLog from "@/functions/updateBattleLog";

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
  const onSubmit = handleSubmit((field) =>
    (async () => {
      const { error } = await updateBattleLog(Number(logNo), field);
      if (error) toaster.create({ title: "更新失敗", type: "error" });
      else toaster.create({ title: "更新成功", type: "success" });
    })(),
  );
  return (
    <form onSubmit={onSubmit}>
      <Flex m={4} gap={4}>
        <Input {...register("title")} placeholder="タイトル" width={{ base: "100%", sm: "50%" }} />
        <Controller render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" />} name="lrig" control={control} />
      </Flex>
      <Stack m={4} gap={4}>
        {fields.map((field, index) => (
          <BattleResult key={field.id} index={index} lrigList={lrigList!} control={control} onRemove={() => remove(index)} />
        ))}
      </Stack>
      <Button onClick={() => append({ lrig: "1", isFirst: true, won: true })} m={4} mr={0} disabled={isSubmitting}>
        追加
      </Button>
      <Button type="submit" m={4} mr={0} disabled={isSubmitting}>
        登録
      </Button>
      <Button m={4} asChild>
        <Link to="/">戻る</Link>
      </Button>
    </form>
  );
};

export default Edit;
