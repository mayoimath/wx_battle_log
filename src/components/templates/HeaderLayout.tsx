import type { ReactNode } from "react";
import Header from "../organisms/Header";

type Props = {
  children: ReactNode;
};

export const HeaderLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
