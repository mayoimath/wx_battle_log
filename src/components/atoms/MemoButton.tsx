import { IconButton, Popover, Portal, Textarea, type TextareaProps } from "@chakra-ui/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CiMemoPad } from "react-icons/ci";

type Props = TextareaProps & { register: UseFormRegisterReturn };

const MemoButton = ({ register, ...rest }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton size="xs">
          <CiMemoPad />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Textarea {...register} {...rest} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default MemoButton;
