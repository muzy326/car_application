export interface Car {
  id: number;           // optional because new cars may not have id yet
  carname: string;       // car name, e.g., "Toyota Corolla"
  price: number;         // rental price per day
  // image: string;         // URL or path to car image
  available: boolean; 
  imageUrl: string;      // frontend-friendly URL
  description: string;   // optional description
  type: string;
  
  hover?: boolean;
  discount?: number;
  rating?: number;// optional type   // true if car is available for booking
}