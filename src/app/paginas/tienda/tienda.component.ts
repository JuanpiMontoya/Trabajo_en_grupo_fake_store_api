import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductComponent} from "../../elementos/product/product.component";
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';


@Component({
 selector: 'app-tienda',
 standalone: true,
 imports: [ProductComponent, CommonModule],
 providers: [ProductService],
 templateUrl: './tienda.component.html',
 styleUrl: './tienda.component.scss'
})

export class TiendaComponent implements OnInit, AfterViewInit{
  listaDeProductos: Product[] = []; //recuperado con fetch en el servicio de productos
  constructor(private productService: ProductService,private elementRef: ElementRef){}

  ngOnInit(): void {
    this.cargarProductos();
  }

  async cargarProductos(){
    this.listaDeProductos = await this.productService.fetchProducts();
  }

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