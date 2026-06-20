import { Box, Flex } from "@chakra-ui/react";
import Header from "../organisms/Header";
import { Outlet } from "react-router";

export const HeaderLayout = () => {
  return (
    <Flex direction="column" h="100dvh">
      <Header />
      <Box flex="1" minH={0}>
        <Outlet />
      </Box>
    </Flex>
  );
};
