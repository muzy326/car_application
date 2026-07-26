import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  goToLogin() { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/registration']); }
  logout() {
    if (isPlatformBrowser(this.platformId)) localStorage.clear();
    this.router.navigate(['/login']);
  }
}
