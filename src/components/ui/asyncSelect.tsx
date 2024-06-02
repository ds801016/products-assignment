import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useApi from "@/hooks/useApi";
import { SelectOptionType } from "@/lib/general";
import { cn } from "@/lib/utils";

interface PropTypes {
  searchFunction: (search: string) => Promise<ResponseType>;
  placeholder?: string;
  value: SelectOptionType;
  onChange: (value: SelectOptionType) => void;
  disabled?: boolean;
}
export function AsyncSelect({
  searchFunction,
  placeholder,
  value,
  disabled,
  onChange,
}: PropTypes) {
  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState<SelectOptionType[]>([]);
  const { execFun, loading } = useApi();

  const handleFetchOptions = async (search: string) => {
    const response = await execFun(() => searchFunction(search), "fetch");
    setOptions(response.data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          // variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex flex-row border justify-start text-black bg-white w-full hover:bg-white"
        >
          <div className=" w-full h-full  flex justify-between items-center">
            {/* f */}
            <div
              className={cn(
                "flex  flex-1 w-full",
                !value?.text && "text-muted-foreground font-normal"
              )}
            >
              {value?.text ?? placeholder}
            </div>
            <div>
              <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onChangeCapture={(e) => handleFetchOptions(e.target.value)}
            placeholder={placeholder}
            className="h-9 "
          />
          {options.length === 0 && (
            <CommandEmpty>No Options found.</CommandEmpty>
          )}
          <CommandList>
            {options.map((row) => (
              <CommandItem
                key={row?.value}
                value={row?.value}
                onSelect={(value: string | SelectOptionType) => {
                  if (options.length > 0) {
                    const found = options.find(
                      (val) => val.value.toLowerCase() === value
                    );
                    console.log("this is the found", found);
                    console.log("this is the selected", value);
                    console.log("this is the options", options);
                    if (found) {
                      onChange(found);
                      setOptions([]);
                      setOpen(false);
                    }
                  } else if (value !== undefined && typeof value === "object") {
                    onChange(value);
                  }
                }}
              >
                {row.text}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value?.value === row?.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
