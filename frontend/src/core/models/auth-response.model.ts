export interface AuthResponseModel {
  message: string;
  token: string;
  user: {
    id: any;
    name: string;
    role: string;
    email?: string;
    phonenumber?: string;
  };
}