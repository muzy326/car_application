import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  goToLogin() { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/registration']); }
  logout() { localStorage.clear(); this.router.navigate(['/login']); }
}