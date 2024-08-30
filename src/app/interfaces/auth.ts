import { Photos } from '../Pages/photos/photos';

export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  First_name: string;
  Last_name: string;
  Email: string;
  Birthdate: string;
  Address: string;
  Mobile: string;
}

export interface UserPreferences {
  Subscription: boolean;
  Theme: string;
  Language: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserEmail {
  Email: string;
}

export interface LoginResponse {
  data: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    First_name: string;
    Last_name: string;
    Password: string;
    Gender: string;
    Birthdate: string;
    Address: string;
    Email: string;
    Mobile: string;
    Role: string;
    Photos: Photos[];
  };
  id: number;
  message: string;
  token: string;
}

export interface UpdatedPassword {
  OldPassword: string;
  NewPassword: string;
}

export interface UpdtdPassword {
  Password: string;
}

export interface customerEmail {
  customer_email: string;
}

export interface CustResponse {
  customer: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    CustomerEmail: string;
  };
  message: string;
}
