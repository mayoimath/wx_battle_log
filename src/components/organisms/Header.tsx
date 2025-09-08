import { Box, Flex, Heading, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        padding="1.5rem"
        justifyContent="center"
      >
        <Link href="#" alignItems="center" display="flex">
          <Heading as="h1">Wixoss Battle Log</Heading>
        </Link>
      </Flex>
    </>
  );
};

export default Header;
