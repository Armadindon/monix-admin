/** Type représentant un utilisateur dans le backend */
export type User = {
  id: number;
  username: string;
  email: string;
  balance: number;
  avatar?: string;
  admin: boolean;
  updatedAt: string;
};

/** Type représentant un produit dans le backend */
export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  barcode: null | string;
  image: string;
};

/** Type représentant un historique dans le backend */
export type History = {
  id: number;
  description: string;
  movement: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  date: string;
  Product: Product;
  User: User;
};
