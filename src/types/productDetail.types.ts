export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
    parent?: {
      id: number;
      name: string;
    };
  };
  creatorId: string;
};
