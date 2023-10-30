import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  registrarNovoUsuario(data: any): Observable<any> {
    const url = 'http://localhost:4200/registro'; // Substitua pela URL correta

    // Você pode ajustar os parâmetros e os cabeçalhos conforme necessário
    const options = {
      headers: { 'Content-Type': 'application/json' }
    };

    // Envia a solicitação HTTP POST para registrar um novo usuário
    return this.http.post(url, data, options);
  }

  // Adicione o método de login
  login() {
    this.isAuthenticated = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  // Adicione o método de logout
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
  }

  // Adicione o método para verificar se o usuário está autenticado
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // register(user: any) {
  //   // Substitua 'URL_DO_SEU_BACKEND/register' pela URL real do endpoint de registro no servidor
  //   return this.http.post('http://localhost:4200/registro', user);
  // }
}
