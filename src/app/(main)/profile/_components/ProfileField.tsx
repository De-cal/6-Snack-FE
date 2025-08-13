"use client";

import { Role } from "@/lib/api/profile.api";
import clsx from "clsx";

type TProfileFieldProps = {
  label: string;
  value?: string;
  isEditable?: boolean;
  role?: string;
  type?: "input" | "display";
  error?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function ProfileField({
  label,
  value,
  isEditable = false,
  role,
  type = "input",
  error,
  name,
  onChange,
  onBlur,
  ...rest
}: TProfileFieldProps) {
  const SuperAdmin = role === Role.SUPER_ADMIN;
  const CompanyName = label === "기업명";

  // 고유한 ID 생성
  const fieldId = name || `profile-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (CompanyName) {
      // 회사명: 영문, 숫자, 한글, 특수문자 ()(),._- 만 허용
      newValue = newValue.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ()(),._\-\s]/g, "").slice(0, 20);
      e.target.value = newValue;
    }

    onChange?.(e);
  };

  const finalError = error || (rest as { error?: string }).error;

  return (
    <fieldset className="self-stretch flex flex-col gap-1 sm:gap-1">
      <div
        className={clsx(
          "border-b",
          SuperAdmin && isEditable && type === "input" ? "border-primary-900" : "border-primary-200",
          finalError && "border-red-500",
        )}
      >
        <div className="py-2">
          <label className="text-primary-600 px-1 pb-[5px] text-xs" htmlFor={fieldId}>
            {label}
          </label>
          {type === "input" && isEditable ? (
            <input
              id={fieldId}
              className={clsx(
                "w-full px-1 text-base outline-none",
                SuperAdmin ? "text-primary-900" : "text-primary-300 bg-transparent",
              )}
              value={value}
              onChange={handleChange}
              onBlur={onBlur}
              name={name}
              aria-describedby={finalError ? `${fieldId}-error` : undefined}
              aria-invalid={finalError ? "true" : "false"}
              {...rest}
            />
          ) : (
            <div
              className="w-full px-1 text-primary-300 text-base bg-transparent !text-primary-300"
              role="text"
              aria-label={`${label}: ${value || "정보 없음"}`}
            >
              {value}
            </div>
          )}
        </div>
      </div>
      {finalError && (
        <div
          id={`${fieldId}-error`}
          className="font-normal text-[12px]/[15px] tracking-tight text-error-500"
          role="alert"
          aria-live="polite"
        >
          {finalError}
        </div>
      )}
    </fieldset>
  );
}
