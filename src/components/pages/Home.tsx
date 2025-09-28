import { Box, Button, Flex, Separator, Stack } from "@chakra-ui/react";

const Home = () => {
  const dummyList = [
    { title: "xxxx", lrig: "タマ" },
    { title: "yyyy", lrig: "花代" },
    { title: "yyyy", lrig: "ピルルク" },
  ];
  return (
    <>
      <Stack m={4} gap={4}>
        {dummyList.map((x, index) => (
          <>
            <Flex key={index} gap={4} align="center">
              <Box>{x.title}</Box>
              <Box>使用ルリグ : {x.lrig}</Box>
              <Button onClick={() => {}}>編集</Button>
            </Flex>
            <Separator />
          </>
        ))}
      </Stack>
      <Button m={4} onClick={() => {}}>
        新規登録
      </Button>
    </>
  );
};

export default Home;
