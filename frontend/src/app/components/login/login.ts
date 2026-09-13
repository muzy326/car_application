import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loading = signal(false);
  loginError = signal('');

  model = {
    email: '',
    password: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Auto redirect if already logged in — guarded so it never runs server-side
    if (isPlatformBrowser(this.platformId) && this.authService.isLoggedIn()) {
      setTimeout(() => this.router.navigate(['/home']), 0);
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Please enter valid email and password');
      return;
    }

    this.loginError.set('');
    this.loading.set(true);

    this.authService.login(this.model.email, this.model.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.toastr.success(`Welcome ${res.user.name}`);

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
      },

      error: (err) => {
        this.loading.set(false);

        if (err.status === 401) this.loginError.set('Incorrect password');
        else if (err.status === 404) this.loginError.set('User not found');
        else this.loginError.set('Login failed. Please try again.');
      }
    });
  }
}