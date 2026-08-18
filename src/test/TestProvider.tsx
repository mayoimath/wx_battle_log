import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { MemoryRouter } from "react-router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AuthContext } from "@/features/auth/providers/AuthProvider";

type Props = {
  children: React.ReactNode;
  route?: string;
};

const TestProvider = ({ children, route = "/" }: Props) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <AuthContext value={{ user: null, loading: false, signIn: vi.fn(), signUp: vi.fn(), signOut: vi.fn() }}>
        <ChakraProvider value={defaultSystem}>
          <Toaster />
          {children}
        </ChakraProvider>
      </AuthContext>
    </MemoryRouter>
  );
};

export default TestProvider;
