"use client";
import MobileCategoryMenu from "@/components/common/MobileCategoryMenu";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import AuthenticatedHeader from "@/components/layout/AuthenticatedHeader";
import React from "react";

export default function SignUpPage() {
  return (
    <div>
      <AuthenticatedHeader />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.8936 9.34839L12 16.2429L5.10547 9.34839L6.16602 8.28784L11.999 14.1208L17.833 8.28784L18.8936 9.34839Z"
          fill="black"
        />
      </svg>
    </div>
  );
}
