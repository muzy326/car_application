export interface AuthResponseModel {
  user: {
    id?: number;
    firstname: string;
    role: string;
    email?: string;
    token?: string;
  };
  message?: string;
}


