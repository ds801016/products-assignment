import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptionType } from "@/lib/general";
import { ReactNode } from "react";

interface PropTypes {
  options: { text: string; value: string; disabled?: boolean }[];
  placeholder: string;
  width?: number;
  value?: string;
  prefix?: ReactNode;
  labelInValue?: boolean;
  disabled?: boolean;
  onChange: (value: string | SelectOptionType) => void;
}

const MySelect = ({
  options,
  placeholder,
  onChange,
  labelInValue,
  prefix,
  width = 200,
  value,
  disabled,
}: PropTypes) => {
  const onChangeWithLabel = (value: string) => {
    if (labelInValue) {
      const found = options.find((opt) => opt.value === value.value);
      if (found) {
        onChange(found);
      }
    } else if (!labelInValue) {
      onChange(value);
    }
    // return found;
  };
  return (
    <Select disabled={disabled} value={value} onValueChange={onChangeWithLabel}>
      <SelectTrigger prefix={prefix} className={`w-full`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((row) => (
          <SelectItem disabled={row.disabled} value={row.value}>
            {row.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MySelect;
