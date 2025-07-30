export type UserRole = "USER" | "ADMIN";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface TInviteMemberModalProps {
  onCancel: () => void;
  onSubmit: (data: { name: string; email: string; role: UserRole }) => void;
  mode?: "invite" | "edit";
  defaultValues?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

/**
 * @wooju01
 * 1. 파일명 카멜케이스로 수정
 * 2. type alias로 수정
 * 3. 앞에 T 붙이기
 */
