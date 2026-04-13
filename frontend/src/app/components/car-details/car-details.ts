import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../services/car-service';
import { Car } from '../../models/car.model';
import { CommonModule } from '@angular/common';
import { BookingFormComponent } from '../booking-form/booking-form';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-car-details',
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

  fallbackImage = 'assets/no-image.jpg';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || isNaN(Number(idParam))) {
      this.setError('Invalid Car ID');
      return;
    }

    const id = Number(idParam);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must login to view details.');
      this.router.navigate(['/login']);
      this.loading = false;
      return;
    }

    await this.loadCar(id);
  }

  private async loadCar(id: number): Promise<void> {
    try {
      const car = await firstValueFrom(this.carService.getCarById(id));

      // Safe fallback values
      this.car = {
        ...car,
        description: car.description || 'No description available',
        imageUrl: car.imageUrl?.trim() || this.fallbackImage,
        rating: car.rating ?? 0,
        discount: car.discount ?? 0,
      };

      this.loading = false;
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to load car:', err);
      this.setError('Failed to load car details');
    }
  }

  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
    this.loading = false;
    this.cdr.detectChanges();
  }

  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  // ✅ Added getStars method for template
  getStars(rating: number): boolean[] {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => i < fullStars);
  }
}