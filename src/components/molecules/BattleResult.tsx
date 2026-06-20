import { Flex } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, type Control } from "react-hook-form";
import type { OptionItem } from "@/types/OptionItem";
import type { BattleLog } from "@/types/BattleLog";
import PrimaryRadioCard from "../atoms/PrimaryRadioCard";
import DeleteButton from "../atoms/DeleteButton";

type Props = {
  index: number;
  lrigList: Array<OptionItem>;
  control: Control<BattleLog, any, BattleLog>;
  onRemove: () => void;
};

const BattleResult = ({ index, lrigList, control, onRemove }: Props) => {
  const playFirstOption = [
    { label: "先", value: "1" },
    { label: "後", value: "0" },
  ];
  const resultOption = [
    { label: "勝", value: "1" },
    { label: "敗", value: "0" },
    { label: "分", value: "2" },
  ];

  return (
    <Flex gapX={8} gapY={2} alignItems="center" wrap="wrap">
      <Controller
        render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" width="250px" />}
        name={`battles.${index}.lrig`}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange } }) => (
          <PrimaryRadioCard value={value} onValueChange={(e) => onChange(e.value)} options={playFirstOption} />
        )}
        name={`battles.${index}.playFirst`}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange } }) => (
          <PrimaryRadioCard value={value} onValueChange={(e) => onChange(e.value)} options={resultOption} />
        )}
        name={`battles.${index}.result`}
        control={control}
      />
      <DeleteButton onClick={onRemove} />
    </Flex>
  );
};

export default BattleResult;
