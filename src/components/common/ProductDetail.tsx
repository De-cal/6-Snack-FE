"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { addToCart } from "@/lib/api/addToCart.api";
import CategoryNavigation from "./ProductDetail/CategoryNavigation";
import ProductImage from "./ProductDetail/ProductImage";
import ProductBasicInfo from "./ProductDetail/ProductBasicInfo";
import ProductActions from "./ProductDetail/ProductActions";
import CartAndLikeButtons from "./ProductDetail/CartAndLikeButtons";
import ProductInfoSections from "./ProductDetail/ProductInfoSections";
import { useAuth } from "@/providers/AuthProvider";
import { useCategoryStore } from "@/stores/categoryStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/components/common/Toast";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import DogSpinner from "@/components/common/DogSpinner";
import icNoOrder from "@/assets/icons/ic_no_order.svg";
import Image from "next/image";

type TProductDetailProps = {
  productId: number;
};

export default function ProductDetail({ productId }: TProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { user } = useAuth();
  const router = useRouter();
  const { setSelectedCategory } = useCategoryStore();
  const queryClient = useQueryClient();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");
  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate: toggleFavorite } = useToggleFavorite(productId, {
    onMutate: () => setIsFavorite((prev) => !prev),
    onError: () => setIsFavorite((prev) => !prev),
  });

  const showToast = (message: string, variant: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: () => {
      if (!product) throw new Error("상품 정보가 없습니다.");
      return addToCart(product.id, selectedQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      router.push("/cart");
    },
    onError: () => {
      alert("장바구니 추가 실패");
    },
  });

  useEffect(() => {
    if (product?.category?.id) {
      setSelectedCategory({
        id: product.category.id,
        parent: product.category.parent?.name || "",
        child: product.category.name,
      });
    }
  }, [product?.category, setSelectedCategory]);

  useEffect(() => {
    if (product) {
      setIsFavorite(product.isFavorite);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen">
        <DogSpinner />
        <p className="text-black text-sm font-medium animate-pulse -mt-7">Loading...</p>
      </div>
      // 나중에 교체
    );
  }
  if (isError || !product)
    return (
      <section className="flex flex-1 justify-center min-h-screen" role="status" aria-label="빈 상태">
        <div className="sm:w-80 inline-flex flex-col justify-start items-center gap-7 py-12 mt-[142px] sm:mt-[222px] md:mt-[191px]">
          <div className="w-24 h-24 relative" role="img" aria-label="주문 내역 없음 아이콘">
            <Image src={icNoOrder} alt="주문 내역 없음" fill className="object-contain" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-12">
            <div className="w-72 flex flex-col justify-start items-center gap-2.5">
              <h2 className="self-stretch text-center text-neutral-800 text-2xl font-extrabold">상품 내역이 없어요</h2>
              <p className="self-stretch text-center text-neutral-700 text-base leading-relaxed">
                원하는 상품을
                <br />
                상품리스트에 추가해보세요.
              </p>
            </div>
            <button
              className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center cursor-pointer"
              onClick={() => router.push("/products")}
              aria-label="상품 리스트 페이지로 이동"
            >
              <span className="text-white text-base font-bold">상품 리스트로 이동</span>
            </button>
          </div>
        </div>
      </section>
    );

  const handleAddToCart = () => {
    if (selectedQuantity < 1) {
      alert("상품의 수량을 1개 이상 선택해주세요.");
      return;
    }

    mutateAddToCart();
  };

  const canEdit = user?.id === product.creatorId || user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const handleToggleFavorite = () => {
    toggleFavorite(isFavorite);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:max-w-[1180px]">
      <div className="w-full flex flex-col justify-center items-start gap-7.5">
        <CategoryNavigation
          parentCategory={product.category.parent?.name ?? "기타"}
          childCategory={product.category.name}
        />
        <div className="w-full flex flex-col md:flex-row md:gap-10">
          <ProductImage imageUrl={product.imageUrl} />
          <div className="flex flex-col justify-center md:justify-start items-center w-full gap-8 md:gap-7.5 pt-7.5 md:pt-8">
            <div className="self-stretch inline-flex justify-between items-start">
              <ProductBasicInfo product={product} />
              <ProductActions
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                canEdit={canEdit}
                productId={product.id}
                productName={product.name}
                showToast={showToast}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <CartAndLikeButtons
                onAddToCart={handleAddToCart}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                productId={product.id}
              />
              <ProductInfoSections />
            </div>
          </div>
        </div>
      </div>
      {toastVisible && <Toast text={toastMessage} variant={toastVariant} isVisible={toastVisible} />}
    </div>
  );
}
