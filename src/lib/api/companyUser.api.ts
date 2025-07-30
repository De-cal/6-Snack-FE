import { cookieFetch } from "@/lib/api/fetchClient.api";
import { TMemberItem } from "@/types/meberList.types";

/**
 * @wooju01
 * 1. 타입 앞에 T 붙이기
 * 2. res 오류 해결하기
 */

type FetchUsersParams = {
  name?: string;
  limit?: number;
  cursor?: string;
};

type FetchUsersResponse = {
  users: TMemberItem[];
  nextCursor: string | null;
};

export const fetchAllCompanyUsers = async (params?: FetchUsersParams): Promise<FetchUsersResponse> => {
  const query = new URLSearchParams();

  if (params?.name) query.set("name", params.name);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.cursor) query.set("cursor", params.cursor);

  const res = await cookieFetch(`/super-admin/users?${query.toString()}`);

  return {
    users: res.users,
    nextCursor: res.nextCursor ?? null,
  };
};
