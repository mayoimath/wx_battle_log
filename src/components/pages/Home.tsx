import { Button, Flex, Input, Stack, Switch } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import type { Battle } from "@/types/Battle";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import PrimarySwitch from "../atoms/PrimarySwitch";

type FormValue = {
  title: string;
  lrig: string;
  battles: Array<Battle>;
};

const Home = () => {
  const dummyDefaultValues: FormValue = {
    title: "xxxx",
    lrig: "1",
    battles: [
      { lrig: "2", isFirst: true, won: true },
      { lrig: "3", isFirst: false, won: false },
    ],
  };
  const lrigList = [
    { label: "タマ", value: "1" },
    { label: "花代", value: "2" },
    { label: "緑子", value: "3" },
    { label: "ピルルク", value: "4" },
  ];
  const { register, control, handleSubmit } = useForm<FormValue>({
    defaultValues: dummyDefaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "battles",
    control,
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Flex m={4} gap={4}>
        <Input
          {...register("title")}
          placeholder="タイトル"
          width={{ base: "100%", sm: "50%" }}
        />
        <PrimaryCombobox
          control={control}
          items={lrigList}
          name="lrig"
          label="使用ルリグ"
        />
      </Flex>
      <Stack m={4} gap={4}>
        {fields.map((field, index) => (
          // <BattleResult key={field.id} index={index} lrigList={lrigList} />
          <Flex key={field.id} gap={8}>
            <PrimaryCombobox
              control={control}
              name={`battles.${index}.lrig`}
              items={lrigList}
              label="使用ルリグ"
            />
            <Controller
              name={`battles.${index}.isFirst`}
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <PrimarySwitch
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  innerLabel={{ on: "先", off: "後" }}
                />
              )}
            />
            <Controller
              name={`battles.${index}.won`}
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <PrimarySwitch
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  innerLabel={{ on: "勝", off: "敗" }}
                />
              )}
            />
            <Button onClick={() => remove(index)}>削除</Button>
          </Flex>
        ))}
      </Stack>
      <Button
        onClick={() => append({ lrig: "1", isFirst: true, won: true })}
        m={4}
        mr={0}
      >
        追加
      </Button>
      <Button type="submit" m={4}>
        登録
      </Button>
    </form>
  );
};

export default Home;
