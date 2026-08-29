import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../services/car-service';
import { AuthService } from '../../services/auth-service';
import { Car } from '../../../core/models/car.model';
import { BookingFormComponent } from '../booking-form/booking-form';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BookingFormComponent],
  templateUrl: './car-details.html',
  styleUrls: ['./car-details.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  error = false;
  errorMessage = '';

  fallbackImage = 'assets/no-image.jpg';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private carService: CarService,
    private authService: AuthService,
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

    if (isPlatformBrowser(this.platformId) && !this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    await this.loadCar(id);
  }

  private async loadCar(id: number): Promise<void> {
    try {
      const car = await firstValueFrom(this.carService.getCarById(id));
      this.car = {
        ...car,
        description: car.description || 'No description available',
        imageUrl: car.imageUrl?.trim() || this.fallbackImage,
        rating: car.rating ?? 0,
        discount: car.discount ?? 0,
      };
      this.loading = false;
      this.cdr.markForCheck();
    } catch (err) {
      console.error('Failed to load car:', err);
      this.setError('Failed to load car details');
    }
  }

  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
    this.loading = false;
    this.cdr.markForCheck();
  }

  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  getStars(rating: number): boolean[] {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => i < fullStars);
  }
}