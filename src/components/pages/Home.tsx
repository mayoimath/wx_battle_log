import useFetchSummary from "@/hooks/UseFetchSummary";
import { Box, Button, Flex, Separator, Stack } from "@chakra-ui/react";
import { Link } from "react-router";

const Home = () => {
  const summary = useFetchSummary();
  return (
    <>
      <Stack m={4} gap={4}>
        {summary.map((x, index) => (
          <>
            <Flex key={index} gap={4} align="center">
              <Box>{x.title}</Box>
              <Box>使用ルリグ : {x.lrig}</Box>
              <Box>
                {x.wonCount}-{x.loseCount}
              </Box>
              <Button onClick={() => {}}>編集</Button>
            </Flex>
            <Separator />
          </>
        )) ?? <></>}
      </Stack>
      <Button m={4} asChild>
        <Link to="/battle_log">新規登録</Link>
      </Button>
    </>
  );
};

export default Home;
