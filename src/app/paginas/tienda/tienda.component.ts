import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductComponent} from "../../elementos/product/product.component";
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'



@Component({
 selector: 'app-tienda',
 standalone: true,
 imports: [ProductComponent, CommonModule, FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  AsyncPipe],
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