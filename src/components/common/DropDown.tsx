"use client";

import { useState } from "react";
import Image from "next/image";

import ChevronUpIcon from "@/assets/icons/ic_chevron_up.svg";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down.svg";

type TDropdownProps = {
  options?: string[];
  value: string;
  onChange: (value: string) => void;
};

const defaultOptions = ["최신순", "판매순", "낮은 가격순", "높은 가격순", "높은 할인순"];

const Dropdown = ({ options = [], value, onChange }: TDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const menuOptions = (options.length > 0 ? options : defaultOptions).filter((option) => option !== value);

  return (
    <div className="relative inline-block w-32">
      {/* 드롭다운 버튼 */}
      <div
        className={`h-11 px-4 py-2.5 bg-white border border-neutral-200 ${
          isOpen ? "border-b-0 rounded-t" : "rounded"
        } flex justify-between items-center cursor-pointer`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="text-neutral-800 text-base font-normal whitespace-nowrap">{value ? value : "정렬"}</div>
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
        <div className="absolute w-full z-10 bg-white border border-neutral-200 border-t-0 rounded-b max-h-[300px] overflow-y-auto">
          {menuOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="h-12 pl-4 pr-5 py-2 hover:bg-neutral-100 cursor-pointer text-neutral-800 text-base font-normal flex items-center whitespace-nowrap"
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
