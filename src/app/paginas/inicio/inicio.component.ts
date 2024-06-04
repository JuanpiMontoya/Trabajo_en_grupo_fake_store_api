import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent implements OnInit, AfterViewInit {

  selectedImage: string = '../../../assets/media/productos.png'; // Imagen seleccionada por defecto

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Seleccionar el primer div por defecto
    const firstAdvantage = document.getElementById('first-advantage');
    if (firstAdvantage) {
      firstAdvantage.classList.add('clicked');
    }
  }

  handleClick(event: Event, imagePath: string): void {
    const advantages = document.querySelectorAll('.advantage');
    advantages.forEach(advantage => {
      advantage.classList.remove('clicked');
    });
    (event.currentTarget as HTMLElement).classList.add('clicked');
    this.selectedImage = imagePath; 
  }

  handleLogin(event: Event): void {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Simulación de autenticación exitosa
    if (email && password) {
      sessionStorage.setItem('loggedIn', 'true');
      alert('Inicio de sesion exitoso');
      (document.getElementById('email') as HTMLInputElement).value = "";
      (document.getElementById('password') as HTMLInputElement).value = "";
      this.router.navigate(['/inicio']); 
    }
  }
}


