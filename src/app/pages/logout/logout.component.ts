import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registrarNovoUsuario(this.user).subscribe(
      (response: any) => {
        console.log('Registro bem-sucedido:', response);

        // Registro bem-sucedido, redirecione o usuário para a página de login
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Erro no registro:', error);

        // Lidar com erros de registro, como nome de usuário já em uso, e-mail inválido, etc.
      }
    );
  }
}
