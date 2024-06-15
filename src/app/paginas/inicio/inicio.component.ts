import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../servicios/scroll.service'; 


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent implements AfterViewInit {

  constructor(private router: Router,private scrollService: ScrollService,private elementRef: ElementRef) { }

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  selectedImage: string = '../../../assets/media/inicio/productos.png'; // Imagen seleccionada por defecto

  // Maneja el clic en un elemento y actualiza la imagen seleccionada
  handleClick(event: Event, imagePath: string): void {
    // Eliminamos 'clicked' de todos los elementos con la clase 'advantage'
    const advantages = document.querySelectorAll('.advantage');
    advantages.forEach(advantage => {
      advantage.classList.remove('clicked');
    });
    // Añade la clase 'clicked' al elemento clickeado
    (event.currentTarget as HTMLElement).classList.add('clicked');
    // Actualiza la imagen
    this.selectedImage = imagePath; 
  }
}