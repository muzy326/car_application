import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FilterCarPipe } from '../../pipes/filter-car.pipe';
import { CarService } from '../../services/car-service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-carlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, FilterCarPipe],
  templateUrl: './carlist.html',
  styleUrls: ['./carlist.css'],
})
export class CarlistComponent implements OnInit {
  cars: Car[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(
    private carService: CarService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.loading = true;

    this.carService.getCars().subscribe({
      next: (data) => {
        // Map cars to ensure description and imageUrl always exist
        setTimeout(() => {
          this.cars = data.map(car => ({
            ...car,
            description: car.description || 'No description available',
            imageUrl: car.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'
          }));
          this.loading = false;
          this.cd.detectChanges();
        });
      },
      error: (err) => {
        console.error('API ERROR:', err);
        this.loading = false;
        if (err.status === 401) {
          alert('You are not authorized. Please login again.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  viewDetails(carId: number | undefined) {
    if (!carId) return;
    this.router.navigate(['/car', carId]);
  }
}