import type { ComboboxItem } from "@/types/ComboboxItem";
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type Props = {
  items: Array<ComboboxItem>;
  label: string;
  name: string;
  notFoundText?: string;
  control: any;
};

const PrimaryCombobox = ({
  items,
  label,
  name,
  notFoundText,
  control,
}: Props) => {
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  });
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Combobox.Root
          value={field.value ? [field.value] : []}
          defaultValue={field.value ? [field.value] : []}
          onValueChange={({ value }) => field.onChange(value[0] || "")}
          collection={collection}
          onInputValueChange={(e) => filter(e.inputValue)}
          onInteractOutside={() => field.onBlur()}
          width="300px"
        >
          <Combobox.Control>
            <Combobox.Input placeholder={label} />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Empty>{notFoundText || "該当なし"}</Combobox.Empty>
                {collection.items.map((item) => (
                  <Combobox.Item item={item} key={item.value}>
                    {item.label}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      )}
    />
  );
};

export default PrimaryCombobox;
