import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent {

  loading: boolean = false;

  // Model for template-driven form
  userModel = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    recaptcha: false
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Template-driven registration submit
  register(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.userModel.password !== this.userModel.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    this.loading = true;

    const userData = {
      firstname: this.userModel.firstname,
      lastname: this.userModel.lastname,
      email: this.userModel.email,
      password: this.userModel.password
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.firstname);
        localStorage.setItem('role', res.user.role);
        this.toastr.success('Registration Successful ✅');
        form.resetForm();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) this.toastr.error('User already exists ❌');
        else this.toastr.error('Registration failed. Try again ❌');
      }
    });
  }

}