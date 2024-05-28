import { Component, OnInit  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent implements OnInit {

  selectedImage: string = '../../../assets/media/productos.png'; // Imagen seleccionada por defecto

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Seleccionar el primer div por defecto
    const firstAdvantage = document.getElementById('first-advantage');
    if (firstAdvantage) {
      firstAdvantage.classList.add('clicked');
    }
  }

  handleClick(event: any, imagePath: string) {
    const advantages = document.querySelectorAll('.advantage');
    advantages.forEach(advantage => {
      advantage.classList.remove('clicked');
    });
    event.currentTarget.classList.add('clicked');
    this.selectedImage = imagePath; // Actualizamos la imagen seleccionada
  }
}


