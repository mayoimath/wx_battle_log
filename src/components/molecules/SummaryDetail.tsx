import type { Summary } from "@/types/Summary";
import { Box, Flex, Grid, GridItem, ScrollArea, Separator } from "@chakra-ui/react";
import React from "react";
import PrimaryScrollArea from "../atoms/PrimaryScrollArea";
import EditButton from "../atoms/EditButton";
import DeleteButton from "../atoms/DeleteButton";

type Props = {
  summary: Array<Summary>;
} & React.ComponentProps<typeof ScrollArea.Root>;

const SummaryDetail = ({ summary, ...props }: Props) => {
  return (
    <>
      <PrimaryScrollArea height="80vh" {...props}>
        {summary.map((x, index) => (
          <React.Fragment key={index}>
            <Grid templateColumns={{ base: "1fr 1fr 1fr", md: "3fr 1fr 1fr 1fr" }} alignItems="center" mx={3} my={1}>
              <GridItem colSpan={{ base: 3, md: 1 }}>
                <Box textStyle="xl">{x.title}</Box>
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
                  <EditButton link={`/battle_log/${x.logNo}`} />
                  <DeleteButton onClick={() => {}} />
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
