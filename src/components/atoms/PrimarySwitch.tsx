import { Switch } from "@chakra-ui/react";
import { type FocusEventHandler, type FormEventHandler } from "react";

type Props = {
  name: string;
  value: boolean;
  onChange: FormEventHandler<HTMLLabelElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  innerLabel?: { on: string; off: string };
};

const PrimarySwitch = ({
  name,
  value,
  onChange,
  onBlur,
  innerLabel,
}: Props) => {
  return (
    <Switch.Root
      name={name}
      checked={value}
      onChange={onChange}
      size="lg"
      colorPalette={"green"}
      color="green.200"
    >
      <Switch.HiddenInput onBlur={onBlur} />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator fallback={innerLabel?.off}>
          {innerLabel?.on}
        </Switch.Indicator>
      </Switch.Control>
    </Switch.Root>
  );
};

export default PrimarySwitch;
