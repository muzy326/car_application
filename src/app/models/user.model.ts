export interface User {
  id?: number;
  firstname: string;
  lastname?: string;
  email: string;
  password?: string;
  role?: string;
  phonenumber?: string;         // optional
  createdAt?: string;      // optional, for future
  
}