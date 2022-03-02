export interface User {
  email: string;
  name: string;
  cnpj: string;
  companyName: string;
  phone: string;
  password: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type AuthStatus = "idle" | "loading" | "error";

export interface AuthState {
  user: User | null;
  status: AuthStatus;
}
