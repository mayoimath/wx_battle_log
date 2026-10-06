import { Button, Card, Flex, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import useFetchBattleLog from "../hooks/UseFetchBattleLog";
import { Link, useParams } from "react-router";
import type { BattleLogDB, BattleLogView } from "../types/BattleLog";
import PrimaryScrollArea from "@/components/atoms/PrimaryScrollArea";

const toBattleLogView = (battleLog: BattleLogDB | undefined): BattleLogView | undefined => {
  if (!battleLog) return undefined;
  const { title, lrigName, detail } = battleLog;
  return {
    title,
    lrigName,
    detail: detail.map(({ lrigName, playFirst, result, memo }) => ({
      lrigName,
      playFirst: (playFirst ?? false) ? "先攻" : "後攻",
      result: (result ?? 0) == 0 ? "負" : result == 1 ? "勝" : "分",
      memo,
    })),
  };
};

const BattleLogViewPage = () => {
  const { logNo } = useParams();
  const { data, error, isLoading } = useFetchBattleLog(Number(logNo));

  if (isLoading) return <Spinner m="auto" position="absolute" top="50%" left="50%" />;
  if (error) return <div>データが取得できませんでした。</div>;

  const battleLog = toBattleLogView(data)!;

  return (
    <Stack gap="4" p="4" h="full">
      <Stack gap="1">
        <Heading size="lg">{battleLog.title}</Heading>
        <Text>使用ルリグ : {battleLog.lrigName}</Text>
      </Stack>
      <PrimaryScrollArea flex="1">
        <Stack gap="2">
          {battleLog.detail.map((battle, index) => (
            <Card.Root size="sm" maxW="90vw" key={index}>
              <Card.Body p="2">
                <HStack>
                  <Text>{index + 1}.</Text>
                  <Text>{battle.lrigName}</Text>
                  <Text>{battle.playFirst}</Text>
                  <Text>{battle.result}</Text>
                </HStack>
                <Text wordWrap="break-word">{battle.memo}</Text>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      </PrimaryScrollArea>
      <Flex p={4} gap={4}>
        <Button asChild>
          <Link to="/">戻る</Link>
        </Button>
      </Flex>
    </Stack>
  );
};

export default BattleLogViewPage;
