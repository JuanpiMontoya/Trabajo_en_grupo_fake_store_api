import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { ScrollService } from '../../servicios/scroll.service'; 

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})

export class NosotrosComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService, private elementRef: ElementRef) {}

  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }
}