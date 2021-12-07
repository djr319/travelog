export type Trip = {
  uid: string;
  id?: string;
  city: string;
  dateFrom: Date;
  dateTo: Date;
  visit: string[];
  createdAt?: Date;
  users?: string;
};
