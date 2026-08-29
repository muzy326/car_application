import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { STORAGE_KEYS } from '../../../core/constants/storage-keys.const';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const id = localStorage.getItem(STORAGE_KEYS.LATEST_BOOKING_ID);
      this.latestBookingId = id ? Number(id) : null;

      this.loadAuthState();

      if (!this.isAdmin && this.userId) {
        this.bookingService.getCurrentBooking().subscribe({
          next: (bookings: Booking[]) => {
            if (bookings && bookings.length > 0 && bookings[0].id) {
              this.latestBookingId = bookings[0].id;
              this.cdr.markForCheck();
            }
          },
          error: err => console.error('Failed to fetch latest booking', err)
        });
      }
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenus();
        if (this.isBrowser) {
          this.loadAuthState();
        }
        this.cdr.markForCheck();
      });
  }

  private loadAuthState(): void {
    this.displayName = this.authService.displayName;
    this.isAdmin = this.authService.isAdmin;
    this.userId = this.authService.userId ? Number(this.authService.userId) : null;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
    this.cdr.markForCheck();
  }

  closeMenus() {
    this.isCollapsed = true;
    this.adminDropdownOpen = false;
    this.userDropdownOpen = false;
    this.cdr.markForCheck();
  }

  logout() {
    this.authService.logout();

    this.displayName = null;
    this.isAdmin = false;
    this.userId = null;
    this.latestBookingId = null;

    this.closeMenus();
    this.router.navigate(['/login']);
  }
}