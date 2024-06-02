import * as z from "zod";
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm as useReactHookForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useForm = <T extends FieldValues>(
  initialValues: DefaultValues<T>,
  schema: z.ZodType<any, any, any>
) => {
  type formType = UseFormReturn<T, any, T> & {
    validate: () => Promise<T | undefined>;
  };
  const form: formType = {
    ...useReactHookForm<T>({
      resolver: zodResolver(schema),
      defaultValues: initialValues,
    }),
    validate: async (): Promise<FieldValues | boolean> => {
      const isValid = await form.trigger();

      if (isValid) {
        const values = form.getValues();
        return values;
      }
      return false;
    },
  };

  return form;
};

export default useForm;
