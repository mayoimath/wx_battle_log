import type { OptionItem } from "@/types/OptionItem";
import { HStack, RadioCard } from "@chakra-ui/react";
import type { ValueChangeDetails } from "@zag-js/radio-group";
import { RadioCardItem } from "../ui/radio-card";

type Props = {
  value: string;
  onValueChange?: ((details: ValueChangeDetails) => void) | undefined;
  title: string;
  options: Array<OptionItem>;
};

const PrimaryRadioCard = ({ value, onValueChange, title, options }: Props) => {
  return (
    <RadioCard.Root value={value} onValueChange={onValueChange}>
      <RadioCard.Label>{title}</RadioCard.Label>
      <HStack>
        {options.map((option) => (
          <RadioCardItem {...option} />
        ))}
      </HStack>
    </RadioCard.Root>
  );
};

export default PrimaryRadioCard;
