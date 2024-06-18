import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../servicios/scroll.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../servicios/user.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})

export class CrearCuentaComponent {

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private elementRef: ElementRef,
    private userService: UserService
  ) { }

  //Insertamos el servicio scroll 
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  usuario: User = {
    fullName: '',
    email: '',
    password: '',
    country: '',
    city: '',
    address: ''
  };

  terms: boolean = false;

  async onSubmit(): Promise<void> {
    try {
      if (
        !this.usuario.fullName ||
        !this.usuario.email ||
        !this.usuario.password ||
        !this.usuario.country ||
        !this.usuario.city ||
        !this.usuario.address
      ) {
        alert('Todos los campos son obligatorios, llena los datos faltantes');
        return;
      }

      if (!this.terms) {
        alert('Debe aceptar los términos y condiciones');
        return;
      }

      await this.userService.createUser(this.usuario);
      alert('¡Cuenta Creada!');
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error creando cuenta:', error);
      alert('Ocurrió un error al crear la cuenta. Inténtelo de nuevo más tarde.');
    }
  }
}