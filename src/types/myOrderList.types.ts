export type TOrderItem = {
  id: number;
  userId: string;
  totalPrice: number;
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  receipts: {
    productName: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }[];
};
