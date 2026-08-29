import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-un-authorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card text-center p-5 shadow-lg">
        <h1 class="display-4 text-danger mb-3">🚫 Unauthorized</h1>
        <p class="lead mb-4">
          You do not have permission to access this page.
        </p>
        <button class="btn btn-primary" (click)="goToLogin()">
          Go to Login
        </button>
      </div>
    </div>
  `,
  styles: [`
    body { margin: 0; font-family: Arial, sans-serif; }
    .card { max-width: 400px; border-radius: 12px; }
  `]
})
export class UnAuthorizedComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}