import React, { FC } from "react";

/**
 * @rakaso598
 * 1. export default function으로 변경
 */

type TConfirmationModalProps = {
  isOpen: boolean; // 모달을 열고 닫는 상태
  productName: string; // 삭제할 상품명
  onCancel: () => void; // 취소 버튼 클릭 시 실행될 함수
  onDelete: () => void; // 상품 삭제 버튼 클릭 시 실행될 함수

  // 새롭게 추가된 props
  modalTitle?: string; // 모달 제목 (선택 사항, 기본값 제공)
  modalDescription?: string; // 모달 설명 (선택 사항, 기본값 제공)
  confirmButtonText?: string; // 확인/삭제 버튼 텍스트 (선택 사항, 기본값 제공)
  cancelButtonText?: string; // 취소 버튼 텍스트 (선택 사항, 기본값 제공)
};

const ConfirmationModal: FC<TConfirmationModalProps> = ({
  isOpen,
  productName,
  onCancel,
  onDelete,
  // props에 기본값 할당
  modalTitle = "상품을 삭제하시겠어요?",
  modalDescription = "삭제 후에는 복구할 수 없습니다.",
  confirmButtonText = "상품 삭제",
  cancelButtonText = "더 생각해볼게요",
}) => {
  // isOpen이 false이면 모달을 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  return (
    // 모달 오버레이 (fixed position, 전체 화면, 반투명 배경)
    <div className="fixed inset-0 z-50 flex items-center backdrop-blur-xs justify-center font-suit">
      {/* 모달 내용 컨테이너 */}
      <div className="bg-white rounded-md p-6 w-full max-w-md mx-4 sm:mx-0">
        {/* Title */}
        <h2 className="text-lg font-bold text-black text-center mb-2">
          {modalTitle} {/* props로 받은 제목 사용 */}
        </h2>
        {/* Confirmation Message */}
        <p className="text-primary-900 text-center text-md mb-6">
          {modalDescription} {/* props로 받은 설명 사용 */}
        </p>
        {/* Product to Delete section */}
        <div className="flex items-center justify-center mb-8">
          {/* Red X Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="12" fill="#4C8AE1" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {/* Product Name */}
          <span className="text-primary-950 font-bold">{productName}</span>
          <span className="ml-1 text-red"></span>
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onCancel}
            className="w-full  py-5 px-10 border border-primary-300  text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-colors duration-200"
          >
            {cancelButtonText} {/* props로 받은 취소 버튼 텍스트 사용 */}
          </button>
          <button
            onClick={onDelete}
            className="w-full  py-5 px-10 border border-transparent  text-sm font-medium text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-colors duration-200"
          >
            {confirmButtonText} {/* props로 받은 확인/삭제 버튼 텍스트 사용 */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
