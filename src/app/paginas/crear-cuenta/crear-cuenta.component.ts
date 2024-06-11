import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  country: string = '';
  city: string = '';
  address: string = '';
  terms: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.terms) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    const nuevoUsuario = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      country: this.country,
      city: this.city,
      address: this.address
    };

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.router.navigate(['/inicio']);
  }
}


