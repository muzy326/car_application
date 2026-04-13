import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './users-management.html',
  styleUrls: ['./users-management.css']
})
export class UsersManagementComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  editingUserId: number | null = null;

  userModel: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'User',
    phonenumber: ''
  };

  p: number = 1;
  itemsPerPage: number = 5;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  /** Load all users (Admin) */
  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.filterUsers();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
        this.loading = false;
        if (err.status === 401) alert('Unauthorized. Please login again.');
      }
    });
  }

  /** Filter users by search term */
  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(u =>
        u.firstname.toLowerCase().includes(term) ||
        (u.lastname?.toLowerCase().includes(term) || false) ||
        u.email.toLowerCase().includes(term) ||
        (u.role?.toLowerCase().includes(term) || false) ||
        (u.phonenumber?.toLowerCase().includes(term) || false)
      );
    }
    this.p = 1;
  }

  /** Pagination */
  get pagedUsers(): User[] {
    const start = (this.p - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  /** Add or update user */
  saveUser(form: NgForm): void {
    if (form.invalid) return;
    this.loading = true;

    if (this.editingUserId !== null) {
      // Update user
      this.userService.updateUser(this.editingUserId, this.userModel).subscribe({
        next: (res: User) => {
          alert('User updated successfully!');
          this.resetForm(form);
          this.loadUsers();
        },
        error: (err: any) => {
          console.error('Failed to update user', err);
          this.loading = false;
        },
        complete: () => this.loading = false
      });
    } else {
      // Add new user
      this.userService.addUser(this.userModel).subscribe({
        next: (res: User) => {
          alert('User added successfully!');
          this.resetForm(form);
          this.loadUsers();
        },
        error: (err: any) => {
          console.error('Failed to add user', err);
          this.loading = false;
        },
        complete: () => this.loading = false
      });
    }
  }

  /** Edit user */
  editUser(user: User): void {
    this.editingUserId = user.id!;
    this.userModel = { ...user, password: '' }; // don't send old password
  }

  /** Delete user */
  deleteUser(userId: number | undefined): void {
    if (!userId) return;
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.loadUsers();
      },
      error: (err: any) => console.error('Failed to delete user', err)
    });
  }

  /** Reset form */
  resetForm(form?: NgForm): void {
    this.editingUserId = null;
    if (form) form.resetForm();
    this.userModel = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'User',
      phonenumber: ''
    };
  }

  prevPage(): void { if (this.p > 1) this.p--; }
  nextPage(): void { if (this.p < this.totalPages) this.p++; }

}