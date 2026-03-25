import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../services/car-service';
import { Car } from '../../models/car.model';
import { CommonModule } from '@angular/common';
import { BookingFormComponent } from '../booking-form/booking-form';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BookingFormComponent],
  templateUrl: './car-details.html',
  styleUrls: ['./car-details.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || isNaN(Number(idParam))) {
      this.error = true;
      this.errorMessage = 'Invalid Car ID';
      this.loading = false;
      return;
    }

    const id = Number(idParam);

    // Check auth
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must login to view details.');
      this.router.navigate(['/login']);
      this.loading = false;
      return;
    }

    // Load car safely
    await this.loadCar(id);
  }

  private async loadCar(id: number): Promise<void> {
    try {
      const car = await firstValueFrom(this.carService.getCarById(id));
      this.car = car;
      this.loading = false;

      // Trigger change detection to prevent NG0100
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to load car:', err);
      this.error = true;
      this.errorMessage = 'Failed to load car details';
      this.loading = false;
      this.cdr.detectChanges(); // ✅ NG0100 safe
    }
  }
}