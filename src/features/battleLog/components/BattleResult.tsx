import { Field, Flex, Grid, GridItem } from "@chakra-ui/react";
import PrimaryCombobox from "../../../components/atoms/PrimaryCombobox";
import { Controller, useFormContext } from "react-hook-form";
import type { OptionItem } from "@/types/OptionItem";
import PrimaryRadioCard from "../../../components/atoms/PrimaryRadioCard";
import DeleteButton from "../../../components/atoms/DeleteButton";
import type { BattleLog } from "../types/BattleLog";

type Props = {
  index: number;
  lrigList: Array<OptionItem>;
  onRemove: () => void;
};

const BattleResult = ({ index, lrigList, onRemove }: Props) => {
  const playFirstOption = [
    { label: "先", value: "1" },
    { label: "後", value: "0" },
  ];
  const resultOption = [
    { label: "勝", value: "1" },
    { label: "敗", value: "0" },
    { label: "分", value: "2" },
  ];

  const {
    control,
    formState: { errors },
  } = useFormContext<BattleLog>();
  const error = Array.isArray(errors.battles) ? errors.battles[index] : null;
  return (
    <Grid
      gap={2}
      templateAreas={{
        base: `
          "lrig ."
          "first delete"
        `,
        md: `"lrig first delete"`,
      }}
    >
      <GridItem area="lrig">
        <Field.Root invalid={!!error?.lrig}>
          <Controller
            render={({ field }) => <PrimaryCombobox {...field} items={lrigList!} label="使用ルリグ" />}
            name={`battles.${index}.lrig`}
            control={control}
          />
          {error?.lrig && <Field.ErrorText>{error.lrig.message}</Field.ErrorText>}
        </Field.Root>
      </GridItem>
      <GridItem area="first">
        <Flex gapX={6}>
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
        </Flex>
      </GridItem>
      <GridItem area="delete">
        <DeleteButton onClick={onRemove} />
      </GridItem>
    </Grid>
  );
};

export default BattleResult;
