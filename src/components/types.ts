export interface User {
  username: string;
  password: string;
  email: string;
}

export interface DecodedToken extends User {
  exp: number;
}

export interface Category {
  _id: string;
  title: string;
}

export interface CategoryProps {
  data: Category;
}

export interface Item {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image: string;
  _id: string;
}

export interface CartProduct extends Item {
  quantity: number;
}

export interface CartItemProps {
  data: CartProduct;
}
