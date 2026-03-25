import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Car } from '../../../models/car.model';
import { CarService } from '../../../services/car-service';

@Component({
  selector: 'app-car-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-management.html',
  styleUrls: ['./car-management.css']
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

  constructor(private carService: CarService) {
    this.loadCars();
  }

  // Empty car template
  getEmptyCar(): Car {
    return {
      id: 0,
      carname: '',
      price: 0,
      description: '',
      imageUrl: '',
      available: true,
      type: ''
    };
  }

  // Load cars from backend
  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (res) => {
        this.cars = res.map(car => ({
          ...car,
          description: car.description || 'No description available',
          imageUrl: car.imageUrl || 'assets/no-image.png',
          type: car.type || ''
        }));
        this.filterCars();
      },
      error: (err) => console.error('Error loading cars:', err)
    });
  }

  // Search filter
  filterCars(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter(c =>
      c.carname.toLowerCase().includes(term) ||
      (c.description ?? '').toLowerCase().includes(term) ||
      (c.type ?? '').toLowerCase().includes(term)
    );
    this.p = 1;
  }

  get pagedCars(): Car[] {
    const start = (this.p - 1) * this.itemsPerPage;
    return this.filteredCars.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.itemsPerPage) || 1;
  }

  // Add / Update car
  saveCar(form: NgForm): void {
    if (form.invalid) return;

    // Basic validation
    if (!this.carModel.carname || !this.carModel.type || this.carModel.price <= 0) {
      alert('Please fill all required fields and enter a valid price.');
      return;
    }

    this.loading = true;

    const carData: any = { ...this.carModel, price: Number(this.carModel.price) };
    if (!this.editingCarId) delete carData.id;

    const request$ = this.editingCarId
      ? this.carService.updateCar(this.editingCarId, carData)
      : this.carService.addCar(carData);

    request$.subscribe({
      next: () => {
        alert(this.editingCarId ? 'Car updated successfully!' : 'Car added successfully!');
        this.afterSave(form);
      },
      error: (err) => {
        console.error('Failed to save car:', err);
        alert(err.error?.message || 'Failed to save car. Check backend console.');
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }

  afterSave(form: NgForm): void {
    this.loading = false;
    this.resetForm(form);
    this.loadCars();
    // close modal
    if (this.carModalClose) this.carModalClose.nativeElement.click();
  }

  editCar(car: Car): void {
    this.editingCarId = car.id;
    this.carModel = { ...car };
  }

 deleteCar(id: number) {
  if (confirm('Are you sure you want to delete this car?')) {
    this.carService.deleteCar(id).subscribe({
      next: () => {
        alert('Car deleted successfully');
        this.loadCars(); // reload cars
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Failed to delete car');
      }
    });
  }
}

  resetForm(form?: NgForm): void {
    this.editingCarId = null;
    this.carModel = this.getEmptyCar();
    if (form) form.resetForm(this.carModel);
  }

  prevPage(): void { if (this.p > 1) this.p--; }
  nextPage(): void { if (this.p < this.totalPages) this.p++; }
}