import { Component,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../servicios/scroll.service'; 
import { User } from '../../interfaces/user'; 


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

  usuario: User = {
    id: '',
    fullName: '',
    email: '',
    password: '',
    country: '',
    city: '',
    address: '',
    confirmPassword: ''
  };

  terms: boolean = false;

onSubmit() {
    // Verificar si algún campo está vacío
  if (!this.usuario.fullName || !this.usuario.email || !this.usuario.password || !this.usuario.country || !this.usuario.city || !this.usuario.address) {
    alert('Todos los campos son obligatorios, llena los datos faltantes');
    return;
  }

  // Verificar contraseñas
  if (this.usuario.password !== this.usuario.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Verificar términos y condiciones
  if (!this.terms) {
    alert('Debe aceptar los términos y condiciones');
    return;
  }

  // Obtenemos la lista de usuarios, o inicializamos una lista vacía si no existen usuarios
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as User[];
  
  // Añadir el nuevo usuario a la lista
  usuarios.push(this.usuario);
  
  // Guardar la lista actualizada de usuarios en el localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('¡Cuenta Creada!');
  this.router.navigate(['/inicio']);
}
}