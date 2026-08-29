import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CarService } from '../../../services/car-service';
import { Car } from '../../../../core/models/car.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-management.html',
  styleUrls: ['./car-management.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarManagementComponent {

  @ViewChild('carModalClose') carModalClose!: ElementRef;

  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm = '';
  editingCarId: number | null = null;
  loading = false;

  p = 1;
  itemsPerPage = 4;

  carModel: Car = this.getEmptyCar();

  constructor(private carService: CarService, private cdr: ChangeDetectorRef) {
    this.loadCars();
  }

  getEmptyCar(): Car {
    return { id: 0, carname: '', price: 0, description: '', imageUrl: '', available: true, type: '', rating: 5 };
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: res => {
        this.cars = res;
        this.filterCars();
        this.cdr.markForCheck();
      },
      error: err => console.error('Error loading cars:', err)
    });
  }

  filterCars(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter(c =>
      c.carname.toLowerCase().includes(term) ||
      (c.description ?? '').toLowerCase().includes(term) ||
      (c.type ?? '').toLowerCase().includes(term)
    );
    this.p = 1;
    this.cdr.markForCheck();
  }

  get pagedCars(): Car[] {
    const start = (this.p - 1) * this.itemsPerPage;
    return this.filteredCars.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.itemsPerPage) || 1;
  }

  saveCar(form: NgForm): void {
    if (form.invalid) return;
    this.loading = true;
    this.cdr.markForCheck();

    const carData: Car = { ...this.carModel, price: Number(this.carModel.price), rating: Number(this.carModel.rating ?? 5) };

    const request$ = this.editingCarId
      ? this.carService.updateCar(this.editingCarId, carData)
      : this.carService.addCar(carData);

    request$.subscribe({
      next: () => {
        alert(this.editingCarId ? 'Car updated!' : 'Car added!');
        this.afterSave(form);
      },
      error: err => {
        console.error(err);
        alert(err.error?.message || 'Failed to save car');
        this.loading = false;
        this.cdr.markForCheck();
      },
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  afterSave(form: NgForm): void {
    this.resetForm(form);
    this.loadCars();
    if (this.carModalClose) this.carModalClose.nativeElement.click();
  }

  editCar(car: Car): void {
    this.editingCarId = car.id;
    this.carModel = { ...car };
    this.cdr.markForCheck();
  }

  deleteCar(id: number): void {
    if (!confirm('Are you sure?')) return;
    this.carService.deleteCar(id).subscribe({
      next: () => {
        alert('Car deleted!');
        this.loadCars();
      },
      error: err => {
        console.error('Delete error:', err);
        alert(err.error?.message || 'Failed to delete car');
        this.cdr.markForCheck();
      }
    });
  }

  resetForm(form?: NgForm): void {
    this.editingCarId = null;
    this.carModel = this.getEmptyCar();
    if (form) form.resetForm(this.carModel);
    this.cdr.markForCheck();
  }

  prevPage(): void { if (this.p > 1) this.p--; this.cdr.markForCheck(); }
  nextPage(): void { if (this.p < this.totalPages) this.p++; this.cdr.markForCheck(); }

  getStarsArray(rating: number = 5): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}