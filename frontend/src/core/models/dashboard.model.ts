// core/models/dashboard.model.ts
export interface MonthValue {
  month: string;
  revenue?: number;
  newCustomers?: number;
}

export interface RevenueSummary {
  totalRevenue: number;
}