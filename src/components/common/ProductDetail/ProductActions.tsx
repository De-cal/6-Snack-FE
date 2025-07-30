import { useState } from "react";
import QuantityDropdown from "../QuantityDropdown";
import MenuDropdown from "../MenuDropdown";
import ConfirmationModal from "@/components/common/ConfirmationModal"; // 모달 import
import { deleteProductApi } from "@/lib/api/deleteProduct.api";
import { useRouter } from "next/navigation";

type TProductActionsProps = {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  canEdit: boolean;
  productId: number;
  productName: string;
};

export default function ProductActions({
  selectedQuantity,
  onQuantityChange,
  canEdit,
  productId,
  productName,
}: TProductActionsProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProductApi(productId);
      alert("상품이 삭제되었습니다.");
      router.push("/products");
    } catch {
      alert("상품 삭제 실패");
    }
  };

  return (
    <>
      <div className="flex items-start gap-3.5 sm:gap-5">
        <QuantityDropdown value={selectedQuantity} onClick={onQuantityChange} />

        {canEdit && (
          <MenuDropdown
            menuType="product"
            // onEdit={() => console.log("상품 수정")}
            onDelete={() => setShowModal(true)}
          />
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmationModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onDelete={handleDelete}
        productName={productName}
        modalTitle="상품을 삭제하시겠어요?"
        modalDescription="삭제 후에는 복구할 수 없습니다."
        confirmButtonText="상품 삭제"
        cancelButtonText="더 생각해볼게요"
      />
    </>
  );
}
