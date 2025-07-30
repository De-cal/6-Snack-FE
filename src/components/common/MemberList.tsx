import { useModal } from "@/providers/ModalProvider";
import { TMemberItem } from "@/types/meberList.types";
import Badge from "../ui/Badge";
import DeleteAccountConfirmModal from "./DeleteAccountConfirmModal";
import InviteMemberModal from "./InviteMemberModal";
import MenuDropdown from "./MenuDropdown";

/**
 * @wooju01
 * 1. rfc 스니펫 사용
 * 2. onEdit 에러 해결
 */

type TMemberListProps = TMemberItem & {
  onClickDeleteUser?: (id: string) => void;
};

const MemberList = ({ id, name, email, role, onClickDeleteUser }: TMemberListProps) => {
  const { openModal, closeModal } = useModal();
  return (
    <>
      {/* 모바일 전용 레이아웃 */}
      <div className=" sm:hidden w-full py-4 border-b border-[#e6e6e6] flex justify-between gap-3">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex justify-center items-center text-black text-sm font-medium ">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="text-primary-950 text-base font-bold">{name}</div>
              <Badge type={role === "ADMIN" ? "admin" : "user"} />
            </div>
            <div className="text-primary-950 text-base">{email}</div>
          </div>
        </div>
        <MenuDropdown
          menuType="member"
          onEdit={() => {
            openModal(
              <InviteMemberModal
                mode="edit"
                defaultValues={{ name, email, role, id }}
                onCancel={closeModal}
                onSubmit={(data) => {
                  console.log("권한 수정:", data);
                  closeModal();
                }}
              />,
            );
          }}
          onDelete={() =>
            openModal(
              <DeleteAccountConfirmModal
                name={name}
                email={email}
                onCancel={closeModal}
                onConfirm={() => {
                  onClickDeleteUser?.(id);
                  closeModal();
                }}
              />,
            )
          }
        />
      </div>

      {/* 데스크탑 & 태블릿 레이아웃 */}
      <div className="hidden sm:inline-flex w-full h-24 border-b border-[#e6e6e6] justify-start items-center gap-8 ">
        <div className="flex justify-start items-center gap-5">
          <div className="w-8 h-8 relative bg-primary-50 rounded-full overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[10px] font-medium">
              {name.slice(0, 1).toUpperCase()}
            </div>
          </div>
          <div className="w-24 inline-flex flex-col justify-center items-start">
            <div className="text-primary-950 text-base font-bold">{name}</div>
          </div>
        </div>

        <div className="flex-1 text-primary-950 text-base">{email}</div>

        <Badge type={role === "ADMIN" ? "admin" : "user"} />

        <div className="flex gap-2">
          <div
            className="w-24 px-5 py-2.5 bg-white rounded-sm outline-1 outline-offset-[-1px] outline-primary-300 flex justify-center items-center cursor-pointer"
            onClick={() => {
              openModal(
                <InviteMemberModal
                  mode="edit"
                  defaultValues={{ name, email, role, id }}
                  onCancel={closeModal}
                  onSubmit={(data) => {
                    console.log("권한 수정:", data);
                    closeModal();
                  }}
                />,
              );
            }}
          >
            <div className="text-center text-primary-900 text-base whitespace-nowrap leading-none">권한 변경</div>
          </div>
          <div
            className="w-24 px-5 py-2.5 bg-red flex justify-center items-center rounded-sm cursor-pointer"
            onClick={() =>
              openModal(
                <DeleteAccountConfirmModal
                  name={name}
                  email={email}
                  onCancel={closeModal}
                  onConfirm={() => {
                    onClickDeleteUser?.(id);
                    closeModal();
                  }}
                />,
              )
            }
          >
            <div className="text-white text-base whitespace-nowrap leading-none">계정 탈퇴</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberList;
