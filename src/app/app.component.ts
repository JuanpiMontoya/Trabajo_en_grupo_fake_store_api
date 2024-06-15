import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mi-tienda-con-fake-store-api';
  loggedIn: boolean = false;

  constructor(private router: Router) {}

  //Cargamos los datos del producto y verificamos el inicio de sesión

  ngOnInit(): void {
    const logged = sessionStorage.getItem('loggedIn');
    if (logged === 'true') {
      this.loggedIn = true;
    }
  }

  checkLogin(event: Event): void {
    console.log("valor Logged In" + this.loggedIn)
    if (this.loggedIn) {
      const logoDiv = event.currentTarget as HTMLElement;
      if (logoDiv) {
        logoDiv.style.backgroundColor = '#4c7ec1';
      }
      this.router.navigate(['/iniciar-sesion']);
    } else {
      alert('Por favor, inicia sesión para ingresar a tu carrito.');
    }
  }
}