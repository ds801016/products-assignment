import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectOptionType } from "@/lib/general";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PropType<T extends FieldValues> {
  control: Control<T>;
  description?: string;
  name: Path<T>;
  label: string;
  options?: SelectOptionType[];
  multiple?: boolean;
  className?: string;
  gridCol?: number;
}

function CheckBox<T extends FieldValues>({
  control,
  description,
  name,
  label,
  options,
  multiple,
  className,
  gridCol = 4,
}: PropType<T>) {
  if (multiple) {
    return (
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
            <div className={cn(`grid grid-cols-${gridCol ?? 4} gap-2`)}>
              {options.map((item: SelectOptionType) => (
                <FormField
                  key={item.value}
                  control={control}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value ?? []),
                                    item.value,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.text}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  } else {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem
            className={cn(
              "flex h-full flex-row items-center pt-4 gap-x-2",
              className
            )}
          >
            <FormControl>
              <Checkbox
                className="m-0 p-0 mt-1"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
          </FormItem>
        )}
      />
    );
  }
}

export default CheckBox;
