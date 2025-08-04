import { cookieFetch } from "./fetchClient.api";
import { getUserApi } from "./user.api";

type TBudgetResponse = {
  currentMonthBudget?: number;
  monthlyBudget?: number;
}

export const getBudgets = async (): Promise<TBudgetResponse> => {
  const currentUser = await getUserApi();
  const companyId = currentUser.company?.id;
  
  return cookieFetch(`/admin/${companyId}/budgets`, {
    method: "GET",
  });
};

export const patchBudgets = async (data: { currentMonthBudget: number; monthlyBudget: number }) => {
  const currentUser = await getUserApi();
  const companyId = currentUser.company?.id;
  return cookieFetch(`/super-admin/${companyId}/budgets`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
