import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { MemoryRouter } from "react-router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  route?: string;
};

const TestProvider = ({ children, route = "/" }: Props) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <ChakraProvider value={defaultSystem}>
        <Toaster />
        {children}
      </ChakraProvider>
    </MemoryRouter>
  );
};

export default TestProvider;
