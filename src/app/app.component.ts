import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute} from '@angular/router';
import { AuthService } from './servicios/authentication.service';

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
  reloadDetected: boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const reload = localStorage.getItem('reloadDetected');
    if (reload === 'true') {
      this.reloadDetected = true;
      localStorage.removeItem('reloadDetected');
    }

    this.route.queryParams.subscribe(params => {
      const reload = params['reload'];
      if (reload === 'true' && !this.reloadDetected) {
        this.reloadDetected = true;
        localStorage.setItem('reloadDetected', 'true');
        window.location.reload(); 
      }
    });
    this.loggedIn = this.authService.isLoggedIn();
  }

  //Cargamos los datos del producto y verificamos el inicio de sesión

  checkLogin(event: Event): void {
    if (this.loggedIn) {
      const logoDiv = event.currentTarget as HTMLElement;
      if (logoDiv) {
        logoDiv.style.backgroundColor = '#4c7ec1';
      }
      this.router.navigate(['/carrito']);
    } else {
      alert('Por favor, inicia sesión para ingresar a tu carrito.');
    }
  }
}