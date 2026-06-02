import { ScrollArea } from "@chakra-ui/react";
import React from "react";

const PrimaryScrollArea = ({ children, ...props }: React.ComponentProps<typeof ScrollArea.Root>) => {
  return (
    <ScrollArea.Root {...props}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};

export default PrimaryScrollArea;
