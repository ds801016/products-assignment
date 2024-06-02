import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, prefix, className, type, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex gap-x-1 p-0 items-center file:border-0 bg-white file:text-sm file:font-medium rounded-md  disabled:cursor-not-allowed disabled:opacity-50 outline-none ring-0 border border-border",
          wrapperClassName
        )}
      >
        {prefix && (
          <div className="h-full  flex items-center mx-2 mr-0 text-muted-foreground">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full outline:none px-3 py-2 text-sm file:border-0 bg-transparent rounded-md file:text-sm text-black file:font-medium placeholder:text-muted-foreground outline-none ring-0 disabled:opacity-60",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="h-full  flex items-center mx-2 text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
