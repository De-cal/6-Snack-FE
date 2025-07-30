import React from "react";
import clsx from "clsx";

/**
 * @rakaso598
 * 1. 타입 앞에 T
 * 2. rfc 스니펫 사용
 */

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full max-w-[480px] flex flex-col">
        <label htmlFor={props.id} className="text-neutral-800 text-xs font-normal mb-[2px] pl-[4px]">
          {label}
        </label>
        <input
          ref={ref}
          className={clsx(
            "w-full h-auto pt-0 pb-[8px] px-[4px] outline-none border-b",
            error ? "border-red-500" : "border-neutral-200",
            "text-neutral-800",
            "placeholder:text-neutral-400 placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight",
            className,
          )}
          autoComplete={props.type === "password" ? "new-password" : "off"}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1 leading-tight">{error}</p>}
      </div>
    );
  },
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
