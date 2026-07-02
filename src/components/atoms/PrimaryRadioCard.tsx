import type { OptionItem } from "@/types/OptionItem";
import { Flex, HStack, RadioCard } from "@chakra-ui/react";
import type { ValueChangeDetails } from "@zag-js/radio-group";
import { RadioCardItem } from "../ui/radio-card";

type Props = {
  value: string;
  onValueChange?: ((details: ValueChangeDetails) => void) | undefined;
  title?: string | null;
  options: Array<OptionItem>;
};

const PrimaryRadioCard = ({ value, onValueChange, title, options }: Props) => {
  return (
    <RadioCard.Root value={value} onValueChange={onValueChange} size="sm" variant="solid">
      <Flex alignItems="center">
        {title ?? <RadioCard.Label>{title}</RadioCard.Label>}
        <HStack>
          {options.map((option, index) => (
            <RadioCardItem key={index} {...option} indicator={null} />
          ))}
        </HStack>
      </Flex>
    </RadioCard.Root>
  );
};

export default PrimaryRadioCard;
