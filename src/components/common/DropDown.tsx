"use client";

import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import ChevronUpIcon from "@/assets/icons/ic_chevron_up.svg";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down.svg";

/**
 * @JJOBO
 * 1. export default function으로 변경
 */

type TDropdownProps = {
  options?: string[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

const defaultOptions = ["최신순", "판매순", "낮은 가격순", "높은 가격순"];

const Dropdown = ({ options = [], placeholder = "정렬", onChange, className }: TDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<string>(placeholder);

  const handleSelect = (option: string) => {
    onChange(option);
    setSort(option);
    setIsOpen(false);
  };

  const menuOptions = options.length === 0 ? defaultOptions : options;

  return (
    <div className={twMerge("relative inline-block w-[110px]", className)}>
      {/* 드롭다운 버튼 */}
      <div
        className={`h-11 w-full px-4 py-2.5 bg-white border border-primary-100 ${
          isOpen ? "border-b-0" : "border"
        } flex justify-between items-center cursor-pointer`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="text-primary-950 text-base/[20px] font-normal whitespace-nowrap">{sort}</div>
        <div className="w-4 h-4 relative">
          <Image
            src={isOpen ? ChevronUpIcon : ChevronDownIcon}
            alt="드롭다운 아이콘"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute w-full z-10 bg-white border border-primary-100 border-t-0 rounded-b max-h-[300px] overflow-y-auto">
          {menuOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="h-12 pl-4 pr-5 py-2 hover:bg-gray-50 cursor-pointer text-primary-950 text-base/[20px] font-normal flex items-center whitespace-nowrap"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
