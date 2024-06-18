import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../servicios/scroll.service'; 
import { AuthService } from '../../servicios/authentication.service';
import { UserService } from '../../servicios/user.service';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})

export class IniciarSesionComponent {


  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private elementRef: ElementRef,
    private authService: AuthService,
    private userService: UserService
  ) {}

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  //Función para verificar el inicio de sesión
  
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  async onSubmit(): Promise<void> {
    try {
      const usuarios = await this.userService.getUsers(); 

      const usuario = usuarios.find((u: any) => u.email === this.email && u.password === this.password);

      if (usuario) {
        alert(`Inicio de sesión exitoso, Bienvenido ${usuario.fullName}`);
        this.authService.setLoggedIn(true,usuario);

        this.router.navigate(['/inicio'], { queryParams: { reload: 'true' } });
      } else {
        alert('Error en el inicio de sesión, credenciales incorrectas o la cuenta no existe');
      }
      
      this.email = '';
      this.password = '';
    } catch (error) {
      console.error('Error al obtener usuarios desde la base de datos:', error);
      alert('Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente más tarde.');
    }
  }
}