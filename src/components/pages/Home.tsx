import useFetchSummary from "@/hooks/UseFetchSummary";
import { supabase } from "@/supabase/supabaseClient";
import { Box, Button, Flex, Separator, Stack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { toaster } from "../ui/toaster";

const Home = () => {
  const summary = useFetchSummary();
  const navigate = useNavigate();
  return (
    <>
      <Stack m={4} gap={4}>
        {summary.map((x, index) => (
          <Stack key={index}>
            <Flex gap={4} align="center">
              <Box>{x.title}</Box>
              <Box>使用ルリグ : {x.lrig}</Box>
              <Box>
                {x.wonCount}-{x.loseCount}
              </Box>
              <Button mx={4} asChild>
                <Link to={`/battle_log/${x.logNo}`}>編集</Link>
              </Button>
            </Flex>
            <Separator />
          </Stack>
        )) ?? <></>}
      </Stack>
      <Button m={4} asChild>
        <Link to="/battle_log">新規登録</Link>
      </Button>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          toaster.create({ title: "サインアウト", type: "info" });
          navigate("/login");
        }}
      >
        サインアウト
      </Button>
    </>
  );
};

export default Home;
