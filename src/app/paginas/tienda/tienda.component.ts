import { Component, OnInit } from '@angular/core';
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

export class TiendaComponent implements OnInit {
  listaDeProductos: Product[] = []; //recuperado con fetch en el servicio de productos
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.cargarProductos();
  }

  async cargarProductos(){
    this.listaDeProductos = await this.productService.fetchProducts();
  }
}