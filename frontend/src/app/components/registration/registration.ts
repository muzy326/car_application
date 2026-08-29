import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {

  loading: boolean = false;

  userModel = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    recaptcha: false
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.cdr.markForCheck();

    const userData = {
      firstname: this.userModel.firstname,
      lastname: this.userModel.lastname,
      phonenumber: this.userModel.phonenumber,
      email: this.userModel.email,
      password: this.userModel.password
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.loading = false;
        this.cdr.markForCheck();

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.user.firstname);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('phonenumber', res.user.phonenumber);
        }
        this.toastr.success('Registration Successful ✅');
        form.resetForm();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.cdr.markForCheck();

        if (err.status === 409) this.toastr.error('User already exists ❌');
        else this.toastr.error('Registration failed. Try again ❌');
      }
    });
  }

}