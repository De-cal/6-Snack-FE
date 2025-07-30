export type UserRole = "USER" | "ADMIN";

export type TMemberItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

/**
 * @JJOBO
 * 1. 앞에 T 붙이기
 */
