import React, { FC, useRef } from "react";
import XIconSvg from "@/components/svg/XIconSvg";
/**
 * @rakaso598
 * 1. export default function으로 변경
 */

type TConfirmationModalProps = {
  isOpen: boolean;
  productName: string;
  onCancel: () => void;
  onDelete: () => void;
  modalTitle?: string;
  modalDescription?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const ConfirmationModal: FC<TConfirmationModalProps> = ({
  isOpen,
  productName,
  onCancel,
  onDelete,
  modalTitle = "상품을 삭제하시겠어요?",
  modalDescription = "삭제 후에는 복구할 수 없습니다.",
  confirmButtonText = "상품 삭제",
  cancelButtonText = "더 생각해볼게요",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      onCancel();
    }
  };

  return (
    <div ref={overlayRef} onClick={handleOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-full max-w-md mx-4 sm:mx-0">
        <h2 className="text-lg font-bold text-black text-center mb-2">{modalTitle}</h2>
        <p className="text-primary-900 text-center text-md mb-6">{modalDescription}</p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <XIconSvg stroke="white" className="w-4 h-4" bgColor="red" />
          <span className="text-primary-950 font-bold">{productName}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onCancel}
            className="w-full py-5 px-10 border border-primary-300 text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-colors duration-200 cursor-pointer"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onDelete}
            className="w-full py-5 px-10 border border-transparent text-sm font-medium text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-colors duration-200 cursor-pointer"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
