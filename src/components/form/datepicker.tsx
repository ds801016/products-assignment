import React, { Ref } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MyDatePicker from "@/components/ui/datepicker";

interface propType<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  description?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

function FormDatePicker<T extends FieldValues>({
  control,
  placeholder = "Select Date",
  description,
  name,
  label,
  suffix,
  prefix,
  className,
  disabled,
  ref,
}: propType<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <MyDatePicker
                placeholder={placeholder}
                onChange={field.onChange}
                value={field.value}
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

export default FormDatePicker;
