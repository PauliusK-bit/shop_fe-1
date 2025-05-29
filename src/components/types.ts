export interface User {
  username: string;
  password: string;
  email: string;
}

export interface DecodedToken extends User {
  exp: number;
}
