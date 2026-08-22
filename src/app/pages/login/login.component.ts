import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Clínica UMG</h3>
          <form (ngSubmit)="onSubmit()">
  <div class="mb-3">
    <label>Usuario</label>
    <input
      type="text"
      class="form-control"
      [(ngModel)]="username"
      name="username"
    >
  </div>

  <div class="mb-3">
    <label>Contraseña</label>
    <input
      type="password"
      class="form-control"
      [(ngModel)]="password"
      name="password"
    >
  </div>

  <button type="submit" class="btn btn-primary w-100">
    Iniciar Sesión
  </button>
</form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f0f2f5;
    }
    .card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => alert('Error de login')
    });
  }
}