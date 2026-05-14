import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import type { Battle } from "@/types/Battle";
import { Controller, useController, useFieldArray, useForm } from "react-hook-form";
import PrimarySwitch from "../atoms/PrimarySwitch";
import useFetchLrigList from "@/hooks/UseFetchLrigList.ts";
import { supabase } from "@/supabase/supabaseClient";
import { toaster } from "../ui/toaster";
import BattleResult from "../molecules/BattleResult";

type FormValue = {
  title: string;
  lrig: string;
  battles: Array<Battle>;
};

const Edit = () => {
  const dummyDefaultValues: FormValue = {
    title: "xxxx",
    lrig: "1",
    battles: [
      { lrig: "2", isFirst: true, won: true },
      { lrig: "3", isFirst: false, won: false },
    ],
  };

  const [lrigList] = useFetchLrigList();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValue>({
    defaultValues: dummyDefaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "battles",
    control,
  });
  const onSubmit = handleSubmit((field) =>
    (async () => {
      const { error } = await supabase.rpc("insert_log", {
        t_log_row: { lrig_id: Number(field.lrig), title: field.title },
        t_detail_rows: field.battles.map((battle) => ({
          opponent_lrig_id: Number(battle.lrig),
          play_first: battle.isFirst,
          result: battle.won ? 1 : 0,
        })),
      });
      if (error) toaster.create({ title: "登録失敗", type: "error" });
      else toaster.create({ title: "登録成功", type: "success" });
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
          <BattleResult id={field.id} index={index} lrigList={lrigList!} control={control} onRemove={() => remove(index)} />
        ))}
      </Stack>
      <Button onClick={() => append({ lrig: "1", isFirst: true, won: true })} m={4} mr={0} disabled={isSubmitting}>
        追加
      </Button>
      <Button type="submit" m={4} disabled={isSubmitting}>
        登録
      </Button>
    </form>
  );
};

export default Edit;
