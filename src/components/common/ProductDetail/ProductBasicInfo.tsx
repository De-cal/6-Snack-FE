import React from "react";
import type { Product } from "@/types/product.types";

type Props = {
  product: Product;
};

export default function ProductBasicInfo({ product }: Props) {
  return (
    <div className="inline-flex flex-col justify-start items-start gap-2">
      <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
        <div className="text-black text-lg/[22px] font-normal tracking-tight">{product.name}</div>
        <div className="text-secondary-500 text-sm/[17px] font-bold tracking-tight">29회 구매</div>
      </div>
      <div className="text-black text-lg/[22px] font-extrabold tracking-tight">{product.price.toLocaleString()}원</div>
    </div>
  );
}
