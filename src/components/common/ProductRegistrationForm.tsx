import React, { FormEvent, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Dropdown from "./DropDown";
import photoIcon from "@/assets/icons/ic_photo.svg";
import Image from "next/image";
import { CATEGORIES } from "../../lib/utils/categories.util";
import { useCreateProduct } from "@/hooks/useProductMutations";

/**
 * @rakaso598
 * 1. 타입 앞에 T
 * 2. 오류 해결
 */

// 상품 데이터를 위한 타입 정의
export type TProductData = {
  productName: string;
  price: string;
  productLink: string;
  mainCategory: string;
  subCategory: string;
  imageUrl?: string;
};

// 폼 데이터 타입 정의
type FormData = {
  productName: string;
  price: string;
  productLink: string;
  mainCategory: string;
  subCategory: string;
};

// ProductRegistrationForm 컴포넌트가 받을 수 있는 프롭스 타입 정의
type TProductRegistrationFormProps = {
  onSubmitSuccess?: () => void;
  onClose?: () => void;
  initialData?: TProductData;
};

export default function ProductRegistrationForm({
  onSubmitSuccess,
  onClose,
  initialData,
}: TProductRegistrationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      productName: "",
      price: "",
      productLink: "",
      mainCategory: "",
      subCategory: "",
    },
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);

  // React Query Mutation
  const createProductMutation = useCreateProduct();

  // initialData가 변경될 때마다 폼 필드를 초기화
  useEffect(() => {
    if (initialData) {
      setValue("productName", initialData.productName);
      setValue("price", initialData.price);
      setValue("productLink", initialData.productLink);
      setValue("mainCategory", initialData.mainCategory);
      setValue("subCategory", initialData.subCategory);
      if (initialData.imageUrl) {
        setImagePreviewUrl(initialData.imageUrl);
      }
    }
  }, [initialData, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleMainCategoryChange = (value: string) => {
    setValue("mainCategory", value);
    // 대분류가 변경되면 소분류 초기화
    setValue("subCategory", "");
  };

  const handleSubCategoryChange = (value: string) => {
    setValue("subCategory", value);
  };

  const onSubmit = async (data: FormData) => {
    // 필수 필드 검증
    if (!imageFile) {
      alert("이미지를 업로드해주세요!");
      return;
    }

    // 카테고리 ID 매핑
    const selectedParentCategory = data.mainCategory;
    const selectedSubCategory = data.subCategory;

    let categoryId = 1; // 기본값

    if (selectedParentCategory && selectedSubCategory) {
      const parentCategory = CATEGORIES.parentCategory.find((cat) => cat.name === selectedParentCategory);
      const childrenCategories = parentCategory
        ? CATEGORIES.childrenCategory[selectedParentCategory as keyof typeof CATEGORIES.childrenCategory]
        : [];
      const subCategory = childrenCategories?.find((cat) => cat.name === selectedSubCategory);

      if (subCategory) {
        categoryId = subCategory.id;
      }
    }

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("price", data.price);
      formData.append("linkUrl", data.productLink);
      formData.append("categoryId", categoryId.toString());
      formData.append("image", imageFile);

      // React Query Mutation 사용
      await createProductMutation.mutateAsync(formData);

      alert("상품이 등록되었습니다!");

      // 폼 초기화
      reset();
      setImageFile(null);
      setImagePreviewUrl(null);

      // 제출 성공 콜백 호출
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // 모달 닫기
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const watchedValues = watch();

  // Parent category 옵션 (이름만 추출)
  const parentCategoryOptions = CATEGORIES.parentCategory.map((category) => category.name);

  // 선택된 parent category에 해당하는 children category 옵션
  const selectedParentCategory = watchedValues.mainCategory;
  const childrenCategoryOptions = selectedParentCategory
    ? CATEGORIES.childrenCategory[selectedParentCategory as keyof typeof CATEGORIES.childrenCategory]?.map(
        (category) => category.name,
      ) || []
    : [];

  return (
    // <div className="min-h-screen flex items-center justify-center p-4 bg-primary-50">

    <div className="w-[512px] h-[696px] fixed inset-0 top-1/2 left-1/2 -translate-1/2 rounded-[6px] p-[30px] bg-white shadow-xl flex flex-col gap-[32px] items-center">
      <h2 className="font-suit font-bold text-[18px] leading-[100%] tracking-[-0.45px] text-primary-950 text-center">
        상품 등록
      </h2>

      <div className="flex justify-center items-center relative">
        {!imagePreviewUrl ? (
          <label
            htmlFor="imageUpload"
            className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px] text-primary-400 cursor-pointer hover:bg-primary-100"
          >
            <Image src={photoIcon} alt="사진 아이콘" />
            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        ) : (
          <>
            <img
              src={imagePreviewUrl}
              alt="Product Preview"
              className="w-[140px] h-[140px] object-contain border border-primary-300 rounded-[2px]"
            />
            <button
              onClick={handleImageRemove}
              className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-800 text-white rounded-full p-1"
              aria-label="Remove image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[32px]">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label htmlFor="mainCategory" className="sr-only">
              대분류
            </label>
            <Dropdown
              options={parentCategoryOptions}
              placeholder="대분류"
              onChange={handleMainCategoryChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="subCategory" className="sr-only">
              소분류
            </label>
            <Dropdown
              options={childrenCategoryOptions}
              placeholder="소분류"
              onChange={handleSubCategoryChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productName"
            {...register("productName", { required: "상품명을 입력해주세요" })}
            placeholder="상품명을 입력해주세요"
            label="상품명"
            hasValue={!!watchedValues.productName}
          />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="price"
            {...register("price", {
              required: "가격을 입력해주세요",
              pattern: {
                value: /^\d+$/,
                message: "숫자만 입력해주세요",
              },
            })}
            placeholder="가격을 입력해주세요"
            label="가격"
            hasValue={!!watchedValues.price}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productLink"
            {...register("productLink", {
              required: "제품 링크를 입력해주세요",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "올바른 URL을 입력해주세요",
              },
            })}
            placeholder="제품 링크를 입력해주세요"
            label="제품 링크"
            hasValue={!!watchedValues.productLink}
          />
          {errors.productLink && <p className="text-red-500 text-sm mt-1">{errors.productLink.message}</p>}
        </div>

        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            disabled={createProductMutation.isPending}
            className="w-[216px] h-[64px] border border-primary-300 rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={createProductMutation.isPending}
            className="w-[216px] h-[64px] rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createProductMutation.isPending ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
