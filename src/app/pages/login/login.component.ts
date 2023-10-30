import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  emailDB: string = "fashionfaces@gmail.com";
  senhaDB: string = "12345678";
  mensagem: string = "";
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.criarForm();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  criarForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.form?.valid) {
      if (this.form.get('email')?.value == this.emailDB && this.form.get('senha')?.value == this.senhaDB) {
        this.mensagem = "Login feito com sucesso!";
        // Redirecione para a próxima página ou URL
        this.router.navigate(['/cadastro_estoque']); // Substitua 'proxima-pagina' pela rota que deseja redirecionar
      } else {
        this.mensagem = "E-mail ou senha estão errados!";
      }
    } else {
      this.mensagem = "Por favor, preencha todos os campos corretamente.";
    }
  }
  
}
