import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScrollService {
  constructor() {}

  applyScroll(elementRef: ElementRef): void {
    // Selecciona el primer div por defecto y le añade la clase 'clicked'
    const firstAdvantage = document.getElementById('first-advantage');
    if (firstAdvantage) {
      firstAdvantage.classList.add('clicked');
    }

    // Obtiene la URL actual y verifica si tiene #
    const url = window.location.href;
    const hashIndex = url.indexOf('#');

    if (hashIndex !== -1) {
      const id = url.substring(hashIndex + 1);
      // Selecciona el elemento con el id del fragmento y hace scroll hacia él
      const element = elementRef.nativeElement.querySelector(`#${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}