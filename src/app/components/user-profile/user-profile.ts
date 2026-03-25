import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfileComponent implements OnInit {
 user?: User;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId')); // we should store userId on login
    if (userId) {
      this.userService.getProfile(userId).subscribe({
        next: (res) => this.user = res,
        error: (err) => console.error(err)
      });
    }
  }

  updateProfile() {
    if (!this.user?.id) return;
    this.userService.updateProfile(this.user.id, this.user).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => console.error(err)
    });
  }
}

