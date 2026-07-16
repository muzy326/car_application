import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {

  userForm!: FormGroup;
  loading = false;
  user?: User;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Build reactive form
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.minLength(10)]]
    });

    // Load user profile
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (res: User) => {
        this.user = res;
        this.userForm.patchValue({
          firstname: res.firstname,
          lastname: res.lastname || '',
          email: res.email,
          phonenumber: res.phonenumber || ''
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  get f() { return this.userForm.controls; }

  updateProfile() {
    if (!this.user) return;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const updatedUser: User = {
      ...this.user,
      ...this.userForm.value
    };

    this.userService.updateProfile(updatedUser).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => console.error(err)
    });
  }
}