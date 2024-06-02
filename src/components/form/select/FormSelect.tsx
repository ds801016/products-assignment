import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldValues, Path } from "react-hook-form";
import MySelect from ".";
import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface PropTypes<T extends FieldValues> {
  options: { text: string; value: string }[];
  placeholder: string;
  width?: number;
  control: Control<T, object>;
  label: string;
  name: Path<T>;
  description?: string;
  type?: string;
  textArea?: boolean;
  suffix?: React.ReactNode;
  className?: string;
  valueAsNumber?: boolean;
  float?: boolean;
  prefix?: ReactNode;
  labelInValue?: boolean;
  disabled?: boolean;
  info?: string;
}

function FormSelect<T extends FieldValues>({
  control,
  placeholder,
  description,
  name,
  label,
  prefix,
  className,
  options,
  labelInValue,
  disabled,
  info,
}: PropTypes<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="w-full flex justify-between items-center">
            <FormLabel>{label}</FormLabel>

            {info && (
              <HoverCard>
                <HoverCardTrigger>
                  <div className="px-2">
                    <Info size={14} className="text-muted-foreground" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{label}</h3>
                    <p className="text-sm">{info}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <FormControl>
            <div className="flex flex-col gap-2">
              <MySelect
                prefix={prefix}
                options={options}
                // className={className}
                // suffix={suffix}
                labelInValue={labelInValue}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            </div>
          </FormControl>
          {description && (
            <FormDescription className="mt-4">{description}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
