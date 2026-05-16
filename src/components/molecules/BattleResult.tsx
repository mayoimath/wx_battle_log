import { Button, Flex } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, type Control } from "react-hook-form";
import type { Battle } from "@/types/BattleLogDetail";
import PrimarySwitch from "../atoms/PrimarySwitch";
import type { ComboboxItem } from "@/types/ComboboxItem";

type FormValue = {
  title: string;
  lrig: string;
  battles: Array<Battle>;
};

type Props = {
  id: string;
  index: number;
  lrigList: Array<ComboboxItem>;
  control: Control<FormValue, any, FormValue>;
  onRemove: () => void;
};

const BattleResult = ({ id, index, lrigList, control, onRemove }: Props) => {
  return (
    <Flex key={id} gap={8}>
      <Controller
        render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" />}
        name={`battles.${index}.lrig`}
        control={control}
      />
      <Controller
        render={({ field }) => <PrimarySwitch {...field} innerLabel={{ on: "先", off: "後" }} />}
        name={`battles.${index}.isFirst`}
        control={control}
      />
      <Controller
        render={({ field }) => <PrimarySwitch {...field} innerLabel={{ on: "勝", off: "負" }} />}
        name={`battles.${index}.won`}
        control={control}
      />
      <Button onClick={onRemove}>削除</Button>
    </Flex>
  );
};

export default BattleResult;
