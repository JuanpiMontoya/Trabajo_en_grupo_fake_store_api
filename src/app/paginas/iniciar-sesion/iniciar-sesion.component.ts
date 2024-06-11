import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    const usuarioRegistrado = {
      email: 'usuario@example.com',
      password: '123456'
    };

    if (this.email === usuarioRegistrado.email && this.password === usuarioRegistrado.password) {
      localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
      this.router.navigate(['/inicio']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}



