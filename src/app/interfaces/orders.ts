import { Photos } from '../Pages/photos/photos';
import { Payments } from './payments';

export interface Orders {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Customer_email: string;
  Total_amount: number;
  Status: string;
  Photos: Photos[];
  Payment: Payments;
}

export interface Order {
  Customer_email: string;
  Photo_ids: number[];
}

export interface OrderResponse {
  order: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    Customer_email: string;
    Total_amount: number;
    Status: string;
    Photos: Photos[];
    Payment: Payments;
  };
  id: number;
  message: string;
}
