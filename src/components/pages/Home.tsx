import { Flex, Input, Stack } from "@chakra-ui/react";
import PrimaryCombobox from "../atoms/PrimaryCombobox";
import BattleResult from "../molecules/BattleResult";

const Home = () => {
  const lrigList = [
    { label: "タマ", value: "1" },
    { label: "花代", value: "2" },
    { label: "緑子", value: "3" },
    { label: "ピルルク", value: "4" },
  ];
  return (
    <>
      <Flex m={4} gap={4}>
        <Input placeholder="タイトル" width={{ base: "100%", sm: "50%" }} />
        <PrimaryCombobox items={lrigList} label="使用ルリグ" />
      </Flex>
      <Stack m={4} gap={4}>
        {Array.from({ length: 3 }).map((_, index) => (
          <BattleResult index={index} lrigList={lrigList} />
        ))}
      </Stack>
    </>
  );
};

export default Home;
