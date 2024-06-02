import { AsyncSelect } from "@/components/ui/asyncSelect";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectOptionType } from "@/lib/general";
import React, { Ref } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface propType<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  description?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  searchFunction: (search: string) => Promise<ResponseType>;
  disabled?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
  onChange?: (value: SelectOptionType) => void;
  info?: string;
}

function FormAsyncSelect<T extends FieldValues>({
  control,
  placeholder,
  description,
  name,
  label,
  searchFunction,
  onChange,
  info,
}: // suffix,
// prefix,
// className,
// disabled,
// ref,
propType<T>) {
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
              <AsyncSelect
                searchFunction={searchFunction}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  if (onChange) {
                    onChange(value);
                  }
                }}
                placeholder={placeholder}
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

export default FormAsyncSelect;
