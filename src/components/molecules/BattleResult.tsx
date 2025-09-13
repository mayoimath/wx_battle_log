import { Flex } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import { Switch } from "../ui/switch";

type Props = {
  index: number;
  lrigList: Array<{ label: string; value: string }>;
};
// TODO:SwitchのPropsの共通化
const BattleResult = ({ index, lrigList }: Props) => {
  return (
    <Flex key={index} gap={8}>
      <PrimaryCombobox items={lrigList} label="使用ルリグ" />
      <Switch
        size="lg"
        colorPalette={"green"}
        color="green.200"
        trackLabel={{ on: "先", off: "後" }}
      />
      <Switch
        size="lg"
        colorPalette={"green"}
        color="green.200"
        trackLabel={{ on: "勝", off: "敗" }}
      />
    </Flex>
  );
};

export default BattleResult;
