import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductComponent} from "../../elementos/product/product.component";
import { ProductService } from '../../product.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';


@Component({
 selector: 'app-tienda',
 standalone: true,
 imports: [ProductComponent, CommonModule, FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  MatSlideToggleModule,
  AsyncPipe,
  RouterLink,
  MatChipsModule
  ],
 providers: [ProductService],
 templateUrl: './tienda.component.html',
 styleUrl: './tienda.component.scss'
})

export class TiendaComponent implements OnInit, AfterViewInit{
  mycontrol = new FormControl('');
  productosFiltrados!: Observable<Product[]>;

  listaDeProductos: Product[] = []; //recuperado con fetch en el servicio de productos
  categorias: string[] = []; //lista de categorias
  categoriaSeleccionada: string |  null = null;

  constructor(private productService: ProductService,private elementRef: ElementRef){
    this.productosFiltrados = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(prod => (prod ? this._filtrarProductos(prod) : this.listaDeProductos.slice())),
    );
  }

  private _filtrarProductos(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.listaDeProductos.filter(prod => prod.title.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  async cargarProductos(){
    this.listaDeProductos = await this.productService.fetchProducts();
  }

  async cargarCategorias() {
    this.categorias = await this.productService.fetchCategories();
  }

  async cargarProductosPorCategoria(category: string) {
    if (this.categoriaSeleccionada === category) {
      // Si se vuelve a clickear el chip de la categoria se vuelven a mostrar todos los productos
      this.categoriaSeleccionada = null;
      this.listaDeProductos = await this.productService.fetchProducts();
    } else {
      // funcionamiento normal: filtrar al elegir alguna categoría
      this.categoriaSeleccionada = category;
      this.listaDeProductos = await this.productService.fetchProductByCategory(category);
    }
    this.mycontrol.setValue(''); // Resetear el contenido de la barra de búsqueda cuando se elige una categoría
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