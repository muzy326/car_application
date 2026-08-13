import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

// Services
import { CarService } from '../../../services/car-service';
import { UserService } from '../../../services/user-service';
import { BookingService } from '../../../services/booking.service';
import { DashboardService } from '../../../services/dashboard.service';

// Models
import { Car } from '../../../../core/models/car.model';
import { Booking } from '../../../../core/models/booking.model';
import { DonutChartComponent } from '../../charts/donut-chart/donut-chart.component';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart.component';



interface ChartData {
  name: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DonutChartComponent,
    PieChartComponent,
    BarChartComponent
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  loader = false;

  totalCars = 0;
  totalUsers = 0;
  totalBookings = 0;
  activeRentals = 0;
  totalRevenue = 0;

  topCarsData: ChartData[] = [];
  bookingStatusData: ChartData[] = [];
  monthlyBookingData: ChartData[] = [];
  dailyBookingData: ChartData[] = [];
  revenueChartData: ChartData[] = [];
  customerGrowthData: ChartData[] = [];

  private colorMap: { [key: string]: string } = {
    SUV: '#4CAF50',
    Sedan: '#2196F3',
    Hatchback: '#FF9800',
    Luxury: '#9C27B0',
    Electric: '#00BCD4',
    Unknown: '#9E9E9E'
  };

  constructor(
    private carService: CarService,
    private userService: UserService,
    private bookingService: BookingService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  // ------------------------------
  private loadDashboard(): void {

    this.loader = true;

    forkJoin({
      cars: this.carService.getCars(),
      bookings: this.bookingService.getAllBookings(),
      users: this.userService.getAllUsers(),
      revenueSummary: this.dashboardService.getSummary(),
      revenueByMonth: this.dashboardService.getRevenueByMonth(),
      customerGrowth: this.dashboardService.getCustomerGrowth()
    }).subscribe({
      next: ({ cars, bookings, users, revenueSummary, revenueByMonth, customerGrowth }) => {

        const mappedBookings: Booking[] = bookings.map((b: any) => ({
          id: b.id,
          userId: b.user_id,
          carId: b.car_id,
          startDate: b.start_date,
          endDate: b.end_date,
          status: b.status
        }));

        // COUNTS
        this.totalCars = cars?.length || 0;
        this.totalUsers = users?.length || 0;
        this.totalBookings = mappedBookings.length;
        this.activeRentals = mappedBookings.filter(b => b.status === 'Confirmed').length;
        this.totalRevenue = (revenueSummary as any)?.totalRevenue || 0;

        // CHARTS
        this.calculateCarTypesFromCars(cars || []);
        this.calculateBookingStatus(mappedBookings);
        this.calculateMonthlyBookings(mappedBookings);
        this.calculateDailyBookings(mappedBookings);

        // Backend-driven charts (same {name, value} shape as everything else)
        this.revenueChartData = (revenueByMonth || []).map((r: any) => ({
          name: r.month,
          value: r.revenue
        }));

        this.customerGrowthData = (customerGrowth || []).map((c: any) => ({
          name: c.month,
          value: c.newCustomers
        }));

        this.loader = false;
      },

      error: (err) => {
        console.error('Dashboard load failed', err);
        this.loader = false;
      }
    });
  }

  // ------------------------------
  private calculateCarTypesFromCars(cars: Car[]): void {

    const typeCount: { [key: string]: number } = {};
    const total = cars.length || 1;

    cars.forEach(car => {
      const type = car.type || 'Unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    this.topCarsData = Object.entries(typeCount).map(([name, value]) => ({
      name: `${name} (${((value / total) * 100).toFixed(1)}%)`,
      value,
      color: this.colorMap[name] || '#607D8B'
    }));
  }

  // ------------------------------
  private calculateBookingStatus(bookings: Booking[]): void {

    const statusCount: { [key: string]: number } = {};

    bookings.forEach(b => {
      const status = b.status || 'Unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    this.bookingStatusData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));
  }

  // ------------------------------
  private calculateMonthlyBookings(bookings: Booking[]): void {

    const monthCount: { [key: string]: number } = {};

    bookings.forEach(b => {
      if (!b.startDate) return;

      const date = new Date(b.startDate);
      if (isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      monthCount[key] = (monthCount[key] || 0) + 1;
    });

    this.monthlyBookingData = Object.keys(monthCount)
      .sort()
      .map(key => {
        const [year, month] = key.split('-');
        const date = new Date(+year, +month - 1);

        return {
          name: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
          value: monthCount[key]
        };
      });
  }

  // ------------------------------
  private calculateDailyBookings(bookings: Booking[]): void {

    const dayCount: { [key: string]: number } = {};

    bookings.forEach(b => {
      if (!b.startDate) return;

      const date = new Date(b.startDate);
      if (isNaN(date.getTime())) return;

      const key = date.toISOString().split('T')[0];

      dayCount[key] = (dayCount[key] || 0) + 1;
    });

    this.dailyBookingData = Object.keys(dayCount)
      .sort()
      .map(key => ({
        name: key,
        value: dayCount[key]
      }));
  }
}