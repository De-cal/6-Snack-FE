"use client";
import { useEffect, useState } from "react";

/**
 * @wooju01
 * 1. 화면 크기 구하는 것을 useDeviceType으로 마이그레이션하기
 * 2. tsx 파일명 ts로 변경하기
 */

export default function useOrderVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      const sm = parseInt(getComputedStyle(root).getPropertyValue("--breakpoint-sm"));
      const md = parseInt(getComputedStyle(root).getPropertyValue("--breakpoint-md"));
      const width = window.innerWidth;

      const breakpointConfig = [
        { width: md, count: 6 },
        { width: sm, count: 8 },
        { width: 0, count: 3 },
      ];
      const matched = breakpointConfig.find(({ width: bpWidth }) => width >= bpWidth);
      setVisibleCount(matched?.count || 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { visibleCount };
}
