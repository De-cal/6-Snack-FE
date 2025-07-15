"use client";

// 작업 완료시 삭제 필수!!
// 해당 페이지에 본인이 작업한 공통 컴포넌트 넣어서 테스트하면 좋을거같아요!

import { useState } from "react";
import TextArea from "@/components/common/TextArea";
import MemberList from "@/components/common/MemberList";
import Dropdown from "@/components/common/DropDown";
import { TMemberItem } from "@/types/meberList.types";
import ProductList from "@/components/common/ProductList";
import Toast from "@/components/common/Toast";
import Button from "@/components/ui/Button";
import RequestList from "@/components/common/RequestList";
import GlobalHeader from "@/components/layout/GlobalHeader";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import Card from "@/components/ui/Card";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import SearchBar from "@/components/ui/SearchBar";
import Badge from "@/components/ui/Badge";
import ProductModal from "@/components/common/ProductEditForm";
import ProductEditForm from "@/components/common/ProductEditForm";
import ProductRegistrationForm from "@/components/common/ProductRegistrationForm";
import Input from "@/components/common/Input";

export default function ComponentsPreviewPage() {
  const [requestMessage, setRequestMessage] = useState("");
  const [categoryOption, setCategoryOption] = useState("다른거");
  const [budget] = useState(60000);
  const categoryOptions = ["음료", "과자", "아이스크림", "도시락", "라면", "사탕", "초콜릿", "떡볶이", "비빔밥"];
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [members, setMembers] = useState<TMemberItem[]>([
    {
      id: "1",
      name: "김스낵",
      email: "sn@codeit.com",
      role: "ADMIN",
    },
    {
      id: "2",
      name: "이유저",
      email: "user@example.com",
      role: "USER",
    },
  ]);

  const handleDeleteUser = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const [sort, setSort] = useState("");

  const handleShowToast = () => {
    setIsToastVisible(true);
  };

  return (
    <div className="max-w-[1440px] p-6 pb-[60px] space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">🧪 공통 컴포넌트 모음</h1>

      <p className="mb-4 font-bold text-xl bg-violet-100">조성빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">TextArea 컴포넌트</h2>
          <TextArea
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="요청 메시지를 입력해주세요"
          />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">MemberList 컴포넌트</h2>
          {members.map((member) => (
            <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />
          ))}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Dropdown 컴포넌트</h2>
          <Dropdown value={sort} onChange={setSort} />
          <Dropdown value={categoryOption} onChange={setCategoryOption} options={categoryOptions} />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Toast 컴포넌트</h2>
          <button
            onClick={handleShowToast}
            className="px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition"
          >
            토스트 띄우기
          </button>

          {isToastVisible && (
            <Toast text="예산이 부족합니다." budget={budget} onClose={() => setIsToastVisible(false)} />
          )}
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">이태빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SubCategoryItem 컴포넌트</h2>
          <SubCategoryItem />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">ProductList 컴포넌트</h2>
          <ProductList />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">RequestList 컴포넌트</h2>
          <RequestList />
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">김우주</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Card 컴포넌트</h2>
          <Card name="코카콜라 제로" purchaseCount={29} price={3000} imageUrl={img_coke_zero} />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SearchBar 컴포넌트</h2>
          <SearchBar />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Badge 컴포넌트</h2>
          <div className="flex">
            <div className="w-18">
              <Badge type="request" />
            </div>
            <div className="w-19">
              <Badge type="rejected" />
              <Badge type="approved" />
              <Badge type="pending" />
            </div>
            <div className="w-18">
              <Badge type="admin" />
              <Badge type="user" />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Button 컴포넌트</h2>
          <div className="flex gap-5">
            <div className="flex flex-col w-96 gap-1">
              <Button type="black" label="Black 버튼" />
              <Button type="primary" label="Primary 버튼" />
              <Button type="lightDisabled" label="LightDisabled 버튼" />
            </div>
            <div className="flex flex-col w-96 gap-1">
              <Button type="whiteOutline" label="White Outline 버튼" />
              <Button type="light" label="Light 버튼" />
              <Button type="whiteDisabled" label="whiteDisabled 버튼" />
            </div>
            <Button
              type="primary"
              label="Primary textClassName"
              textClassName="text-lg font-semibold w-24 h-10 flex items-center justify-center"
            />
          </div>
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">이지수</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">김홍섭</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[상품 수정 모달]</h2>
          <ProductEditForm />
          <h2 className="text-lg font-semibold bg-blue-100">[상품 등록 모달]</h2>
          <ProductRegistrationForm />
          <h2 className="text-lg font-semibold bg-blue-100">[Input]</h2>
          <div>
            <Input value={inputValue} onChange={setInputValue} unit="원" label="floating label" />
            <p>현재 입력된 값: {inputValue}</p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">장원빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>
      </div>
    </div>
  );
}
