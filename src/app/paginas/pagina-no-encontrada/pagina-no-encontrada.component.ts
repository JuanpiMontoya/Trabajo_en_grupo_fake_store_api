import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.scss'
})

export class PaginaNoEncontradaComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
      const id = url.substring(hashIndex + 1);
      const element = this.elementRef.nativeElement.querySelector(`#${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
