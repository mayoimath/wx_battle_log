import useFetchSummary from "@/hooks/UseFetchSummary";
import { supabase } from "@/supabase/supabaseClient";
import { Box, Button, Flex, Grid, GridItem, Separator, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { toaster } from "../ui/toaster";
import React from "react";

const Home = () => {
  const summary = useFetchSummary();
  const navigate = useNavigate();
  return (
    <Stack m={4}>
      {/* Header */}
      <Grid templateColumns={{ base: "1fr 1fr 1fr", md: "3fr 1fr 1fr 1fr" }} mx={4}>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <Text fontWeight="bold">Title</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Lrig</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Result</Text>
        </GridItem>
        <GridItem></GridItem>
      </Grid>
      <Separator />
      {/* Details */}
      {summary.map((x, index) => (
        <React.Fragment key={index}>
          <Grid templateColumns={{ base: "1fr 1fr 1fr", md: "3fr 1fr 1fr 1fr" }} alignItems="center" mx={4}>
            <GridItem colSpan={{ base: 3, md: 1 }}>
              <Box>{x.title}</Box>
            </GridItem>
            <GridItem>
              <Box>{x.lrig}</Box>
            </GridItem>
            <GridItem>
              <Box>
                {x.wonCount}-{x.loseCount}
              </Box>
            </GridItem>
            <GridItem>
              <Flex gap={4}>
                <Button asChild>
                  <Link to={`/battle_log/${x.logNo}`}>編集</Link>
                </Button>
                <Button>削除</Button>
              </Flex>
            </GridItem>
          </Grid>
          <Separator />
        </React.Fragment>
      )) ?? <></>}
      <Flex>
        <Button m={4} asChild>
          <Link to="/battle_log">新規登録</Link>
        </Button>
        <Button
          m={4}
          onClick={async () => {
            await supabase.auth.signOut();
            toaster.create({ title: "サインアウト", type: "info" });
            navigate("/login");
          }}
        >
          サインアウト
        </Button>
      </Flex>
    </Stack>
  );
};

export default Home;
