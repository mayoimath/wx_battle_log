import type { ComboboxItem } from "@/types/ComboboxItem";
import { Combobox, Portal, useCombobox, useFilter, useListCollection } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

type Props = {
  items: Array<ComboboxItem>;
  label: string;
  notFoundText?: string;
  name: string;
  value: number;
  onChange: (value: any) => void;
  onBlur: () => void;
};

const PrimaryCombobox = ({ items, label, notFoundText, name, value, onChange, onBlur }: Props) => {
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter, set } = useListCollection<ComboboxItem>({
    initialItems: [],
    filter: contains,
  });
  // syncSelectedItemsでvalueと表示値の同期が必要。
  const combobox = useCombobox({
    collection,
    name,
    value: value ? [value.toString()] : [],
    onValueChange: ({ value: v }) => onChange(v[0] || ""),
    onInputValueChange: (e) => filter(e.inputValue),
    onInteractOutside: onBlur,
  });
  // データソースが非同期取得の場合、明示的にsetする必要あり。
  useEffect(() => {
    set(items);
  }, [items]);

  const hydrated = useRef(false);
  if (combobox.value.length && collection.size && !hydrated.current) {
    combobox.syncSelectedItems();
    hydrated.current = true;
  }

  return (
    <Combobox.RootProvider value={combobox} width="300px">
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
    </Combobox.RootProvider>
  );
};

export default PrimaryCombobox;
