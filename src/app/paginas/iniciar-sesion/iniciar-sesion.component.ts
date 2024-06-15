import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../servicios/scroll.service'; 


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

  constructor(private router: Router,private scrollService: ScrollService, private elementRef: ElementRef) {}

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  //Función para verificar el inicio de sesión
  
  onSubmit() {
    const usuarioRegistrado = {
      email: 'usuario@example.com',
      password: '123456'
    };

    //Verificamos si el usuario existe e iniciamos sesion

    if (this.email === usuarioRegistrado.email && this.password === usuarioRegistrado.password) { 
      alert(`Inicio de sesión exitoso, Bienvenido ${this.email}`);

      sessionStorage.setItem('loggedIn', 'true');
      
      localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
      // Limpia los campos del formulario
      (document.getElementById('email') as HTMLInputElement).value = "";
      (document.getElementById('password') as HTMLInputElement).value = "";
      // Navega a la ruta '/inicio'
      this.router.navigate(['/inicio']);
    } else {
      alert('Error en el inicio de sesión, credenciales incorrectas');
    }
  }
}



