import React from "react";
import TestProvider from "./TestProvider";
import { render } from "@testing-library/react";

const renderWithProviders = (ui: React.ReactNode, options?: { route?: string }) => {
  return render(<TestProvider route={options?.route}>{ui}</TestProvider>);
};

export default renderWithProviders;
