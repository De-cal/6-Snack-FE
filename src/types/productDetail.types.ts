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

/**
 * @JJOBO
 * 1. 앞에 T 붙이기
 */
