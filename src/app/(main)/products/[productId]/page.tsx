"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductDetail from "@/components/common/ProductDetail";
import { CATEGORIES } from "@/lib/utils/categories.util";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import SubCategoryTabs from "@/app/(main)/products/_components/SubCategoryTabs";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductDetail } from "@/hooks/useProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.productId);

  const { findCategoryPath } = useCategoryStore();
  const { data: product } = useProductDetail(productId);

  useEffect(() => {
    if (product?.category?.id) {
      findCategoryPath(product.category.id);
    }
  }, [product?.category?.id, findCategoryPath]);

  if (!productId || isNaN(productId)) {
    return <div className="py-10">잘못된 접근입니다.</div>;
  }

  return (
    <div className="w-full flex flex-col mt-4 sm:flex-row sm:pt-0 gap-6">
      <div className="block sm:hidden">
        <SubCategoryTabs />
      </div>

      <div className="hidden sm:block w-[180px] shrink-0">
        <SubCategoryItem categories={CATEGORIES} useExternalState />
      </div>

      <div className="flex-1 min-w-0">
        <ProductDetail productId={productId} />
      </div>
    </div>
  );
}
