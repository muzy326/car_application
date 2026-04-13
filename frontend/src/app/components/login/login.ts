import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loading = false;
  loginError = '';

  model = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Auto redirect if token exists
    const token = localStorage.getItem('token');
    if (token) {
      setTimeout(() => this.router.navigate(['/home']), 0);
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Please enter valid email and password');
      return;
    }

    this.loading = true;
    this.loginError = '';

    this.authService.login(this.model.email, this.model.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.firstname);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('userId', res.user.id.toString());

        this.toastr.success(`Welcome ${res.user.firstname}`);

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        if (err.status === 401) this.loginError = 'Incorrect password';
        else if (err.status === 404) this.loginError = 'User not found';
        else this.loginError = 'Login failed. Please try again.';
      },
      complete: () => (this.loading = false)
    });
  }
}