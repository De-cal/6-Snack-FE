import React from "react";

/**
 * @Jam1eL1
 * 1. 인터페이스 -> 타입
 * 2. 타입 앞에 T
 */

interface ProfileAvatarProps {
  label: string;
  className?: string;
}

export default function ProfileAvatar({ label, className = "" }: ProfileAvatarProps) {
  return (
    <div
      className={`w-6 h-6 bg-primary-100 py-1.5 px-[7.5] rounded-[100px] flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className=" text-primary-950 text-[10px] tracking-tight font-medium">{label}</div>
    </div>
  );
}
