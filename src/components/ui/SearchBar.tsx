"use client";

import React, { useEffect, useState, KeyboardEvent, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import IcSearch from "@/assets/icons/ic_search.svg";
import { TSearchBarProps } from "@/types/serchBar.types";

/**
 * @wooju01
 * 1. export default function으로 변경...
 */

function SearchBar({ placeholder = "이름으로 검색하세요", initialValue = "" }: TSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState<string>(initialValue);

  useEffect(() => {
    const q = searchParams.get("name");
    if (q && !initialValue) {
      setSearchText(q);
    }
  }, [searchParams, initialValue]);

  const handleSearch = useCallback(() => {
    const searchTerm = searchText.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (!searchTerm) {
      params.delete("name");
    } else {
      params.set("name", searchTerm);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchText, searchParams, router, pathname]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <div className="w-full py-3 md:py-2 border-b h-12 border-zinc-800 flex items-center gap-2">
      <button onClick={handleSearch} aria-label="검색" type="button">
        <div className="relative w-[24px] h-[24px]">
          <Image src={IcSearch} alt="검색 아이콘" className="flex justify-center items-center object-contain" fill />
        </div>
      </button>
      <input
        type="text"
        placeholder={placeholder}
        className="flex bg-transparent outline-none text-base md:text-lg text-primary-900 font-normal font-suit placeholder-primary-400"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
