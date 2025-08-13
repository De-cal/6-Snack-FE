"use client";
import React, { useEffect, useState } from "react";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getInviteApi, TInviteInfo } from "@/lib/api/invite.api";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { signUpWithInviteApi } from "@/lib/api/auth.api";
import img_dog_error from "@/assets/images/img_dog_error.png";
import Image from "next/image";
import DogSpinner from "@/components/common/DogSpinner";
import { inviteSignupSchema, TInviteSignUpFormData } from "@/lib/schemas/inviteSignupSchema";
import FormErrorMessage from "../../login/_components/FormErrorMessage";

export default function InviteSignUpPage() {
  const params = useParams();
  const router = useRouter();
  const inviteId = params.inviteId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [inviteInfo, setInviteInfo] = useState<TInviteInfo | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, isValid },
    setError: setFormError,
  } = useForm<TInviteSignUpFormData>({
    resolver: zodResolver(inviteSignupSchema),
    mode: "onChange",
  });

  const passwordInput = watch("password");
  const passwordConfirmInput = watch("passwordConfirm");

  useEffect(() => {
    if (passwordConfirmInput) {
      trigger("passwordConfirm");
    }
  }, [passwordInput, passwordConfirmInput, trigger]);

  useEffect(() => {
    const fetchInviteInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getInviteApi(inviteId);
        setInviteInfo(data);
      } catch (error) {
        setInviteError(error instanceof Error ? error.message : "초대 링크가 유효하지 않습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    if (inviteId) {
      fetchInviteInfo();
    }
  }, [inviteId]);

  const onSubmit = async (data: TInviteSignUpFormData) => {
    // ??
    if (!inviteInfo) return;

    try {
      await signUpWithInviteApi(inviteId, data.password, data.passwordConfirm);
      router.push("/login");
    } catch {
      setFormError("root", { message: "회원가입에 실패했습니다. 다시 시도해주세요." });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <DogSpinner />
      </div>
    );
  }

  if (inviteError) {
    return (
      <div className="flex flex-col h-screen justify-center items-center gap-[20px] -mb-[24px]">
        <section className="flex flex-col gap-[16px] justify-center items-center">
          <div className="relative w-[40vw] h-[30vh] max-w-[300px] aspect-[7/8]">
            <Image src={img_dog_error} alt="에러를 나타내는 강아지 이미지" fill className="object-contain" />
          </div>

          <div role="status" className="text-center font-medium text-[16px]/[24px] sm:text-[20px]/[30px]">
            <h2>접근이 제한된 페이지입니다.</h2>
            <p>이 페이지는 유효한 초대 링크를 가진 사람만 접근 할 수 있습니다.</p>
          </div>
        </section>

        <Link
          href="/login"
          className="rounded-[2px] inline-flex justify-center items-center bg-primary-100 font-semibold text-[16px]/[20px] tracking-tight w-full max-w-[230px] min-h-[56px] sm:max-w-[310px] sm:h-[64px]"
        >
          로그인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="sm:relative flex flex-col items-center justify-center gap-[46px] sm:gap-0 pt-[48px] sm:pt-[160px]">
      <div className="sm:absolute sm:top-0 flex flex-col items-center justify-center w-full max-w-[480px] sm:max-w-[600px]">
        <div className="flex justify-center items-center w-full sm:max-w-[500px] h-[140px] sm:h-[214px] py-[38.18px] sm:py-[58.4px] px-[50.92px] sm:px-[77.86px]">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        <div className="sm:hidden">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-center align-middle sm:self-stretch sm:text-start">
              {inviteInfo?.name} 님, 만나서 반갑습니다.
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-center align-middle sm:self-stretch sm:text-start ">
              비밀번호를 입력해 회원가입을 완료해주세요.
            </p>
          </div>
        </div>
      </div>

      <div className="sm:absolute sm:w-[600px] sm:top-[152.12px] flex flex-col w-full items-center justify-center sm:items-start sm:px-[60px] sm:py-[40px] sm:bg-white sm:rounded-xs sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)]">
        <div className="hidden sm:block sm:mb-[20px]">
          <div className="flex flex-col items-start justify-center gap-[10px]">
            <h1 className="text-primary-950 text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight align-middle ">
              {inviteInfo?.name} 님, 만나서 반갑습니다.
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight align-middle">
              비밀번호를 입력해 회원가입을 완료해주세요.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-[30px] gap-[20px]">
          {/* 이메일 */}
          <div className="flex flex-col justify-between w-full h-[56px] py-2 px-1 border-b border-primary-200">
            <label htmlFor="email" className="text-primary-500 text-xs/[15px] font-normal tracking-tight">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={inviteInfo?.email || ""}
              readOnly
              aria-readonly="true"
              className="outline-none text-base/[20px] tracking-tight text-primary-300"
            />
          </div>
          {/* 비밀번호 input wrapper*/}
          <div className="flex flex-col gap-1">
            <div
              className={clsx(
                errors.password ? "border-error-500" : "border-primary-600",
                passwordInput ? "items-end" : "items-center",
                "relative flex justify-between h-[56px] gap-[4px] py-[8px] px-[4px] border-b-1",
              )}
            >
              <div className="flex flex-col justify-center w-full gap-[5px]">
                <label
                  htmlFor="password"
                  className={clsx(
                    passwordInput && passwordInput.length > 0 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    "absolute left-[4px] top-[8px] font-normal text-[12px]/[15px] tracking-tight text-primary-600 transition-all duration-300",
                  )}
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="비밀번호를 입력하세요"
                  aria-describedby={errors.password ? "password-error" : undefined}
                  aria-invalid={!!errors.password}
                  className={clsx(
                    showPassword ? "tracking-tight" : "tracking-[0.25em]",
                    "z-10 w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                  )}
                />
              </div>
              {/* 비밀번호 보임토글 */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className={clsx(
                  passwordInput ? "opacity-100" : "opacity-0",
                  "mt-[24px] cursor-pointer transition-all duration-300",
                )}
              >
                {showPassword ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            <FormErrorMessage message={errors.password?.message} />
          </div>

          <div className="flex flex-col gap-1">
            <div
              className={clsx(
                errors.passwordConfirm ? "border-error-500" : "border-primary-600",
                passwordConfirmInput ? "items-end" : "items-center",
                "relative flex justify-between h-[56px] gap-[4px] py-[8px] px-[4px] border-b-1",
              )}
            >
              <div className="flex flex-col justify-center w-full gap-[5px]">
                <label
                  htmlFor="passwordConfirm"
                  className={clsx(
                    passwordConfirmInput && passwordConfirmInput.length > 0
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                    "absolute left-[4px] top-[8px] font-normal text-[12px]/[15px] tracking-tight text-primary-600 transition-all duration-300",
                  )}
                >
                  비밀번호 확인
                </label>
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  {...register("passwordConfirm")}
                  placeholder="비밀번호를 다시 입력하세요"
                  aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined}
                  aria-invalid={!!errors.passwordConfirm}
                  className={clsx(
                    showPasswordConfirm ? "tracking-tight" : "tracking-[0.25em]",
                    "z-10 w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                  )}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                aria-label={showPasswordConfirm ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"}
                className={clsx(
                  passwordConfirmInput ? "opacity-100" : "opacity-0",
                  "mt-[24px] cursor-pointer transition-all duration-300",
                )}
              >
                {showPasswordConfirm ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            <FormErrorMessage message={errors.passwordConfirm?.message} />
          </div>
        </form>

        <FormErrorMessage message={errors.root?.message} />

        <Button
          type="primary"
          label={isSubmitting ? "처리 중..." : "가입하기"}
          className={clsx(
            "w-full h-[64px] mb-[24px]",
            isValid && !isSubmitting ? "bg-primary-950 text-primary-50" : "bg-primary-100 text-primary-300",
          )}
          onClick={isValid && !isSubmitting ? handleSubmit(onSubmit) : undefined}
          disabled={!isValid || isSubmitting}
          aria-describedby={!isValid ? "form-validation-info" : undefined}
        />
        {!isValid && (
          <div id="form-validation-info" className="sr-only">
            모든 필수 항목을 올바르게 입력해주세요.
          </div>
        )}
        <div className="flex w-full justify-center items-center">
          <p className="text-center text-primary-500 text-base/[20px] tracking-tight ">
            이미 계정이 있으신가요?
            <Link href="/login">
              <span className="text-primary-950 text-base/[20px] tracking-tight font-bold underline decoration-primary-950 underline-offset-2 ml-1">
                로그인
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
