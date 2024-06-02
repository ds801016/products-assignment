import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/dragger";

import { CloudUpload, Paperclip } from "lucide-react";

interface propType<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;

  multiple?: boolean;
  title: string;
}

function FormDragger<T extends FieldValues>({
  control,
  description,
  name,
  label,
  multiple,
  title,
}: propType<T>) {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full h-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col h-full  gap-2">
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={dropZoneConfig}
                className="relative border-dashed ` h-[80%] border hover:bg-muted bg-white rounded-lg p-2 "
              >
                <FileInput className="h-full ">
                  <div className="h-full  flex text-muted-foreground items-center justify-center pt-4 gap-4  w-full ">
                    <CloudUpload size={40} />
                    {/* <FileSvgDraw /> */}
                    <p>{title}</p>
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {field.value &&
                    field.value.length > 0 &&
                    field.value.map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    ))}
                </FileUploaderContent>
              </FileUploader>
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

export default FormDragger;
