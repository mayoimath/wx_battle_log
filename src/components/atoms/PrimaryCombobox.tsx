import type { ComboboxItem } from "@/types/ComboboxItem";
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";

type Props = {
  items: Array<ComboboxItem>;
  label: string;
  notFoundText?: string;
  name: string;
  value: string;
  onChange: (value: any) => void;
  onBlur: () => void;
};

const PrimaryCombobox = ({
  items,
  label,
  notFoundText,
  name,
  value,
  onChange,
  onBlur,
}: Props) => {
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  });
  return (
    <Combobox.Root
      name={name}
      value={value ? [value] : []}
      defaultValue={value ? [value] : []}
      onValueChange={({ value: v }) => onChange(v[0] || "")}
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      onInteractOutside={onBlur}
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
  );
};

export default PrimaryCombobox;
