import { defaultFetch } from "./fetchClient.api";

/**
 * @wooju01
 * 1. 인터페이스 -> 타입 변경
 * 2. 앞에 T 붙이기
 */

export type TInviteInfo = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  expiresAt: string;
  isUsed: boolean;
};
// 초대 정보 조회
export const getInviteApi = async (inviteId: string) => {
  return defaultFetch(`/invite/${inviteId}`);
};

export interface InviteRequestData {
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  companyId: number;
  invitedById: string;
  expiresInDays?: number;
}

export interface InviteResponse {
  message: string;
  inviteId: string;
  inviteLink: string;
  expiresAt: string;
  emailSent: boolean;
  emailError?: string;
}

export const sendInvite = async (data: InviteRequestData): Promise<InviteResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

  const response = await fetch(`${baseUrl}/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "초대 발송에 실패했습니다.");
  }

  return response.json();
};
