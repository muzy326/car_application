import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBarComponent implements OnInit {

  userId: number | null = null;
  displayName: string | null = null;
  isCollapsed = true;
  isAdmin = false;
  isBrowser = false;

  adminDropdownOpen = false;
  userDropdownOpen = false;

  latestBookingId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Always establish browser context first before touching any browser APIs
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const id = localStorage.getItem('latestBookingId');
      this.latestBookingId = id ? Number(id) : null;

      this.displayName = localStorage.getItem('name') || '';

     const role = localStorage.getItem('role');

if (role) {
  this.isAdmin = role.trim().toLowerCase() === 'admin';
} else {
  this.isAdmin = false;
}

      const userIdStr = localStorage.getItem('userId');
      this.userId = userIdStr ? Number(userIdStr) : null;

      // fetch latest booking safely
      if (!this.isAdmin && this.userId) {
      this.bookingService.getCurrentBooking().subscribe({
      next: (bookings: Booking[]) => {
    if (bookings && bookings.length > 0 && bookings[0].id) {
      this.latestBookingId = bookings[0].id;
    }

    
console.log("🔥 NAVBAR LOAD");
console.log("NAME:", localStorage.getItem('name'));
console.log("ROLE:", localStorage.getItem('role'));
console.log("USERID:", localStorage.getItem('userId'));


  },
  error: err => console.error('Failed to fetch latest booking', err)
});
      }
    }

    // close menus on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.closeMenus());
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  goToLatestBill() {

  this.bookingService.getCurrentBooking().subscribe({
    next: (bookings: Booking[]) => {

      if (bookings.length > 0) {
        const id = bookings[0].id;
        this.router.navigate(['/booking-bill', id]);
      } else {
        alert("No bookings found");
      }

    },
    error: () => {
      alert("Unable to load booking");
    }
  });

}

  toggleAdminDropdown() {
    this.adminDropdownOpen = !this.adminDropdownOpen;
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeMenus() {
    this.isCollapsed = true;
    this.adminDropdownOpen = false;
    this.userDropdownOpen = false;
  }
  logout() {
  if (this.isBrowser) {
    localStorage.clear(); // ✅ correct place
  }

  this.displayName = null;
  this.isAdmin = false;
  this.latestBookingId = null;

  this.closeMenus();
  this.router.navigate(['/login']);
}


}

