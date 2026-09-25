import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');

  form = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  entrar() {
    if (this.form.invalid) {
      this.form.markAsTouched();

      this.erro.set('Preencha usuário e senha.');
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (user) => {
        this.authService.salvarSessao(user);

        this.carregando.set(false);

        this.router.navigateByUrl('/perfil');
      },
      error: (error: HttpErrorResponse) => {
        this.carregando.set(false);

        this.erro.set(
          error.status === 400
            ? 'Usuário ou senha inválidos'
            : 'Não foi possivel fazer login. Tente novamente',
        );
      },
    });
  }
}
