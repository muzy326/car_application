import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car.model';

@Pipe({
  name: 'filterCar',
  standalone: true,
  
})
export class FilterCarPipe implements PipeTransform {
  transform(cars: Car[], searchTerm: string): Car[] {
    if (!searchTerm) return cars;
    return cars.filter(car => car.carname.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
