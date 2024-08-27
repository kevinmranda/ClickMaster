import { Orders } from '../../interfaces/orders';

export interface Photos {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Description: string;
  Filename: string;
  Price: number;
  User_id: number;
  Orders: Orders[];
}
