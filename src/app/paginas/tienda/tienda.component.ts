//imports de angular
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
//imports de angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
//imports de nuestro sitio
import { Product } from "../../interfaces/product";
import { ProductComponent } from "../../elementos/product/product.component";
import { ProductService } from '../../servicios/product.service';
import { ScrollService } from '../../servicios/scroll.service'; 
//otros imports
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';




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
  MatChipsModule,
  HttpClientModule
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

  constructor(private productService: ProductService,private scrollService: ScrollService, private elementRef: ElementRef){
    // Hacemos un mapeo con los productos seleccionados
    this.productosFiltrados = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(prod => (prod ? this._filtrarProductos(prod) : this.listaDeProductos.slice())),
    );
  }

  //filtrado de productos

  private _filtrarProductos(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.listaDeProductos.filter(prod => prod.title.toLowerCase().includes(filterValue));
  }

  //cargado de productos y categorias respectivas
  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos() {
    this.productService.fetchProducts().subscribe((productos) => {
      this.listaDeProductos = productos;
    });
  }

  cargarCategorias() {
    this.productService.fetchCategories().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  cargarProductosPorCategoria(category: string) {
    if (this.categoriaSeleccionada === category) {
      // Si se vuelve a clickear el chip de la categoría se muestran todos los productos
      this.categoriaSeleccionada = null;
      this.cargarProductos(); // Recargar todos los productos
    } else {
      // Filtrar productos por la categoría seleccionada
      this.categoriaSeleccionada = category;
      this.productService.fetchProductByCategory(category).subscribe((productos) => {
        this.listaDeProductos = productos;
      });
    }
    this.mycontrol.setValue(''); // Resetear el contenido de la barra de búsqueda
  }
  
  //Insertamos el servicio scroll 
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

}