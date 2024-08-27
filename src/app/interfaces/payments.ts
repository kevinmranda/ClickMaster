export interface Payments {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Order_id: number;
  Amount: number;
  Status: string;
  Payment_method: string;
  Transaction_id: string;
}
