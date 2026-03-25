import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Services
import { CarService } from '../../../services/car-service';
import { UserService } from '../../../services/user-service';
import { BookingService } from '../../../services/booking.service';

// Models
import { Car } from '../../../models/car.model';
import { Booking } from '../../../models/booking.model';

// Charts
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

  topCarsData: ChartData[] = [];
  bookingStatusData: ChartData[] = [];
  monthlyBookingData = {
    data: [] as ChartData[],
    xAxis: 'Month',
    yAxis: 'Bookings'
  };

  // 🎨 Color map for professional UI
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // ✅ Load everything cleanly
    this.loadDashboard();
  }

  // ------------------------------
  private loadDashboard(): void {

    this.carService.getCars().subscribe((cars: Car[]) => {

      this.totalCars = cars.length;

      // ✅ FIX: Car Types from cars (NOT bookings)
      this.calculateCarTypesFromCars(cars);

      // Load bookings after cars
      this.bookingService.getAllBookings().subscribe((bookings: Booking[]) => {

        this.totalBookings = bookings.length;
        this.activeRentals = bookings.filter(b => b.status === 'Confirmed').length;

        this.calculateBookingStatus(bookings);
        this.calculateMonthlyBookings(bookings);

        // Users
        this.userService.getAllUsers().subscribe(users => {
          this.totalUsers = users.length;

          // ✅ FIX Angular error properly
          this.loader = true;
          this.cdr.detectChanges();
        });

      });
    });
  }

  // ------------------------------
  // ✅ PROFESSIONAL DONUT DATA
  private calculateCarTypesFromCars(cars: Car[]): void {

    const typeCount: { [key: string]: number } = {};
    let total = cars.length;

    cars.forEach(car => {
      const type = car.type || 'Unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    this.topCarsData = Object.entries(typeCount).map(([name, value]) => {

      const percentage = ((value / total) * 100).toFixed(1);

      return {
        name: `${name} (${percentage}%)`, // ✅ percentage added
        value,
        color: this.colorMap[name] || '#607D8B'
      };
    });

    console.log('FINAL DONUT DATA:', this.topCarsData);
  }

  // ------------------------------
  private calculateBookingStatus(bookings: Booking[]): void {

    const statusCount: { [key: string]: number } = {};

    bookings.forEach(b => {
      const status = b.status ?? 'Unknown';
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

    bookings.forEach((b: any) => {

      const dateStr = b.startDate || b.start_date;
      if (!dateStr) return;

      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      monthCount[key] = (monthCount[key] || 0) + 1;
    });

    const sortedKeys = Object.keys(monthCount).sort();

    this.monthlyBookingData.data = sortedKeys.map(key => {

      const [year, month] = key.split('-');
      const date = new Date(+year, +month - 1);

      return {
        name: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        value: monthCount[key]
      };
    });
  }
}