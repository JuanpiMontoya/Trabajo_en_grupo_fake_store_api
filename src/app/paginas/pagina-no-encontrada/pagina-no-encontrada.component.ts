import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { ScrollService } from '../../servicios/scroll.service'; 

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.scss'
})

export class PaginaNoEncontradaComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {}

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }
}