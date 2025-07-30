"use client";
import InviteMemberModal from "@/components/common/InviteMemberModal";
import MemberList from "@/components/common/MemberList";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import { fetchAllCompanyUsers } from "@/lib/api/companyUser.api";
import { sendInvite } from "@/lib/api/invite.api";
import { deleteUserById } from "@/lib/api/superAdmin.api";
import { getUserApi } from "@/lib/api/user.api";
import { useModal } from "@/providers/ModalProvider";
import { TMemberItem } from "@/types/meberList.types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

/**
 * @wooju01
 * 1. useState에 타입 정의
 * 2. useQuery, useMutation으로 마이그레이션
 * 3. closeModal은 props로 내려주지 말고, 해당 컴포넌트에서 useModal불러와서 사용하는게 더 좋을 것 같습니다. 전역으로 관리하고 있기 때문에 props로 내려주게 되면 디메리트 되는 것 같아요
 */

export default function User() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const [members, setMembers] = useState<TMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const MEMVERS_PAGE = 5;
  const totalPages = Math.ceil(members.length / MEMVERS_PAGE);

  const paginateMembers = useMemo(() => {
    const start = (currentPaginationPage - 1) * MEMVERS_PAGE;
    return members.slice(start, start + MEMVERS_PAGE);
  }, [members, currentPaginationPage]);

  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const res = await deleteUserById(userId);
      alert(res.message);

      setMembers((prev) => prev.filter((member) => member.id !== userId));
    } catch (error) {
      alert("유저 삭제에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (data: { name: string; email: string; role: "USER" | "ADMIN" }) => {
    try {
      setLoading(true);

      const currentUser = await getUserApi();

      // 초대 API 호출
      const inviteData = {
        email: data.email,
        name: data.name,
        role: data.role,
        companyId: currentUser.company.id,
        invitedById: currentUser.id,
        expiresInDays: 7,
      };

      const result = await sendInvite(inviteData);

      if (result.emailSent) {
        alert("초대 이메일이 성공적으로 발송되었습니다.");
        const { users } = await fetchAllCompanyUsers({ name, limit: 50 });
        setMembers(users);
      } else {
        alert("초대 링크는 생성되었지만 이메일 발송에 실패했습니다.");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "초대 발송에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { users } = await fetchAllCompanyUsers({ name, limit: 50 });
        setMembers(users);
      } catch (error) {
        alert(error instanceof Error ? error.message : "회원 목록 불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  return (
    <div>
      <div className="flex justify-between items-center sm:mt-15 md:mt-[21px]">
        <div className="mt-[20px] mb-3 self-stretch justify-center text-lg font-bold  md:text-2xl">회원 관리</div>
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16 hidden sm:block"
          onClick={() => {
            openModal(<InviteMemberModal onCancel={closeModal} onSubmit={handleInviteUser} />);
          }}
        />
      </div>

      <Suspense>
        <SearchBar />
      </Suspense>

      <div className="w-full mt-10 self-stretch p-5 border-t border-b border-neutral-200 hidden sm:flex justify-start items-center gap-8">
        <div className="px-14 flex justify-start items-center mr-2">
          <div className="justify-center text-zinc-500 text-base font-bold">이름</div>
        </div>
        <div className="flex-1 justify-center text-zinc-500 text-base font-bold">메일</div>
        <div className="w-20 text-center justify-center text-zinc-500 text-base font-bold">권한</div>
        <div className="w-48 text-center justify-center text-zinc-500 text-base font-bold">비고</div>
      </div>

      {loading ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        paginateMembers.map((member) => <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />)
      )}

      <Pagination currentPage={currentPaginationPage} totalPages={totalPages} onPageChange={setCurrentPaginationPage} />

      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16  sm:hidden "
          onClick={() => {
            openModal(<InviteMemberModal mode="invite" onCancel={closeModal} onSubmit={handleInviteUser} />);
          }}
        />
      </div>
    </div>
  );
}
