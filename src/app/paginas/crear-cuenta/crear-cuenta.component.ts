import { Component,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../servicios/scroll.service'; 


@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})

export class CrearCuentaComponent {

  constructor(private router: Router, private scrollService: ScrollService, private elementRef: ElementRef) {}

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  // Creación de nueva cuenta

  //Datos vacios
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  country: string = '';
  city: string = '';
  address: string = '';
  terms: boolean = false;

  onSubmit() {
    // Verificar contraseñas
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Verificar términos y condiciones
    if (!this.terms) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    // Verificar términos y condiciones

    const nuevoUsuario = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      country: this.country,
      city: this.city,
      address: this.address
    };

    // Guardamos el usuario en el local storage

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.router.navigate(['/inicio']);
  }
}