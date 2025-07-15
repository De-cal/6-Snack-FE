import React from "react";

type TBudgetIconSvgProps = {
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
};

export default function BudgetIconSvg({ className = "", onClick, isActive = false }: TBudgetIconSvgProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer text-gray-300 ${className}`}
      onClick={onClick}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 9C20.5523 9 21 9.44772 21 10V14C21 16.7614 16.9706 19 12 19C7.02944 19 3 16.7614 3 14V10C3 9.44772 3.44772 9 4 9H20ZM4.5 14C4.5 14.3256 4.63787 14.7298 5 15.1602V13H6.5V16.2959C6.94285 16.5299 7.44615 16.7385 8 16.9141V14H9.5V17.2822C9.97774 17.3678 10.4792 17.4296 11 17.4648V14H12.5V17.4902C13.0183 17.4729 13.5197 17.4296 14 17.3623V14H15.5V17.0615C16.0443 16.9166 16.5467 16.7389 17 16.5381V13H18.5V15.6475C19.2426 15.042 19.5 14.4464 19.5 14V10.5H4.5V14Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
      <path
        d="M21 10C21 12.7614 16.9706 15 12 15C7.02944 15 3 12.7614 3 10C3 7.23858 7.02944 5 12 5C16.9706 5 21 7.23858 21 10Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
      <path
        d="M19.5 10C19.5 9.4114 19.0531 8.56281 17.6357 7.77539C16.2692 7.0162 14.2794 6.5 12 6.5C9.72056 6.5 7.73081 7.0162 6.36426 7.77539C4.94694 8.56281 4.5 9.4114 4.5 10C4.5 10.5886 4.94694 11.4372 6.36426 12.2246C7.73081 12.9838 9.72056 13.5 12 13.5V15C7.02944 15 3 12.7614 3 10C3 7.23858 7.02944 5 12 5C16.9706 5 21 7.23858 21 10C21 12.7614 16.9706 15 12 15V13.5C14.2794 13.5 16.2692 12.9838 17.6357 12.2246C19.0531 11.4372 19.5 10.5886 19.5 10Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
    </svg>
  );
}
