import type { Summary } from "@/types/Summary";
import { Box, Button, Flex, Grid, GridItem, Separator, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import PrimaryScrollArea from "../atoms/PrimaryScrollArea";

type Props = {
  summary: Array<Summary>;
};

const SummaryDetail = ({ summary }: Props) => {
  return (
    <>
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
      <PrimaryScrollArea height="80vh">
        {/* Details */}
        {summary.map((x, index) => (
          <React.Fragment key={index}>
            <Grid templateColumns={{ base: "1fr 1fr 1fr", md: "3fr 1fr 1fr 1fr" }} alignItems="center" mx={4} my={2}>
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
      </PrimaryScrollArea>
    </>
  );
};

export default SummaryDetail;
