import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MonthValue {
  month: string;
  revenue?: number;
  newCustomers?: number;
}

export interface RevenueSummary {
  totalRevenue: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = `${environment.apiUrl}/analytics`;

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    return this.http.get(`${this.base}/summary`);
  }

  getRevenueByMonth(): Observable<MonthValue[]> {
    return this.http.get<MonthValue[]>(`${this.base}/revenue-by-month`);
  }

  getCustomerGrowth(): Observable<MonthValue[]> {
    return this.http.get<MonthValue[]>(`${this.base}/customer-growth`);
  }
}