import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { Ref } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Control, FieldValues, Path, useController } from "react-hook-form";

interface propType<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  description?: string;
  type?: string;
  textArea?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  valueAsNumber?: boolean;
  float?: boolean;
  disabled?: boolean;
  rows?: number;
  ref?: Ref<HTMLTextAreaElement>;
  multiple?: boolean;
  info?: string;
}

function MyFormField<T extends FieldValues>({
  control,
  placeholder,
  description,
  name,
  type = "text",
  label,
  suffix,
  prefix,
  textArea,
  className,
  valueAsNumber = false,
  float = false,
  disabled,
  rows,
  ref,
  multiple,
  info,
}: propType<T>) {
  const { field } = useController({ name, control });
  const onChange = async (event: any) => {
    if (event.target.files?.[0]) {
      if (multiple) {
        field.onChange(
          Object.keys(event.target.files ?? {}).map(
            (row) => event.target.files[row]
          )
        );
        return;
      }
      field.onChange(event.target.files[0]);
    }
    if (valueAsNumber) {
      if (float) {
        const output = parseFloat(event.target.value);
        return field.onChange(output);
      }
      const output = parseInt(event.target.value, 10);
      return field.onChange(output);
    } else if (type !== "file") {
      return field.onChange(event.target.value);
    }
  };
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
              {textArea ? (
                <Textarea
                  className="resize-none"
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={rows}
                  onChange={onChange}
                  {...field}
                  ref={ref}
                />
              ) : type === "file" ? (
                <Input
                  className={className}
                  suffix={suffix}
                  prefix={prefix}
                  type={type}
                  onChange={onChange}
                  placeholder={placeholder}
                  disabled={disabled}
                  ref={ref}
                  multiple={multiple}
                  // {...field}
                />
              ) : (
                <Input
                  className={className}
                  suffix={suffix}
                  prefix={prefix}
                  type={type}
                  step={float ? 2 : 1}
                  accept={type === "file" ? ".pdf" : ""}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                  ref={ref}
                  onChange={onChange}
                />
              )}
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

export default MyFormField;
