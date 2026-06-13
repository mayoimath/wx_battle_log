import { Button, Flex } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Controller, type Control } from "react-hook-form";
import type { OptionItem } from "@/types/OptionItem";
import type { BattleLog } from "@/types/BattleLog";
import PrimaryRadioCard from "../atoms/PrimaryRadioCard";

type Props = {
  index: number;
  lrigList: Array<OptionItem>;
  control: Control<BattleLog, any, BattleLog>;
  onRemove: () => void;
};

const BattleResult = ({ index, lrigList, control, onRemove }: Props) => {
  return (
    <Flex gap={8}>
      <Controller
        render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" />}
        name={`battles.${index}.lrig`}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange } }) => (
          <PrimaryRadioCard
            value={value}
            onValueChange={(e) => onChange(e.value)}
            title="先攻/後攻"
            options={[
              { label: "先攻", value: "1" },
              { label: "後攻", value: "0" },
            ]}
          />
        )}
        name={`battles.${index}.playFirst`}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange } }) => (
          <PrimaryRadioCard
            value={value}
            onValueChange={(e) => onChange(e.value)}
            title="勝敗"
            options={[
              { label: "勝", value: "1" },
              { label: "敗", value: "0" },
              { label: "分", value: "2" },
            ]}
          />
        )}
        name={`battles.${index}.result`}
        control={control}
      />
      <Button onClick={onRemove}>削除</Button>
    </Flex>
  );
};

export default BattleResult;
