import { Routes } from '@angular/router';
import { authGuard } from './components/guards/functionalguard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./components/registration/registration').then(m => m.RegistrationComponent)
  },

  // Protected Home
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home').then(m => m.HomeComponent)
  },

  // Protected User Pages
  {
    path: 'cars',
    loadComponent: () =>
      import('./components/carlist/carlist').then(m => m.CarlistComponent),
    canActivate: [authGuard]
  },
  {
    path: 'car/:id',
    loadComponent: () =>
      import('./components/car-details/car-details').then(m => m.CarDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./components/booking-form/booking-form').then(m => m.BookingFormComponent),
    canActivate: [authGuard]
  },
  {
  path: 'booking-success',
  loadComponent: () =>
    import('./components/booking-success/booking-success').then(
      m => m.BookingSuccessComponent
    ),
  canActivate: [authGuard]
},
  
  // Booking Bill Route
  {
    path: 'booking-bill/:id',
    loadComponent: () =>
      import('./components/booking-bill/booking-bill').then(m => m.BookingBillComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-bookings',
    loadComponent: () =>
      import('./components/my-bookings/my-bookings').then(m => m.MyBookingsComponent),
    canActivate: [authGuard]
  },
 {
    path: 'profile',
    loadComponent: () =>
      import('./components/user-profile/user-profile').then(m => m.UserProfileComponent),
    canActivate: [authGuard]
  },

  // Admin Pages (fully protected)
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'cars',
        loadComponent: () =>
          import('./components/admin/car-management/car-management').then(m => m.CarManagementComponent),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./components/admin/booking-management/booking-management').then(m => m.BookingManagementComponent),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/admin/users-management/users-management').then(m => m.UsersManagementComponent)
      }
    ]
  },
   {
    path: 'unauthorized',
    loadComponent: () =>
      import('./components/un-authorized/un-authorized')
        .then(m => m.UnAuthorizedComponent)
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];