
import { Component, OnInit, ElementRef } from '@angular/core';
import { CartService } from '../../servicios/cart.service';
import { Product } from "../../interfaces/product";
import { ProductCartComponent } from "../../elementos/product-cart/product-cart.component";
import { ScrollService } from '../../servicios/scroll.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ProductCartComponent],
  providers: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})

export class CarritoComponent implements OnInit {
  totalCarrito: number = 0;
  listaDeProductos_Carrito: Product[] = []; 
  
  constructor(private cartService: CartService,private scrollService: ScrollService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.cargarProductosCarrito();
    alert("Si deseas eliminar todos los productos de tu carrito recarga la página")
  }

  async cargarProductosCarrito() {
    try {
      this.listaDeProductos_Carrito = await this.cartService.getProductos();
    } catch (error) {
      console.error('Error al cargar los productos del carrito:', error);
    }
  }

  async cargarTotalCarrito() {
    try {
      this.totalCarrito = await this.cartService.getTotal();
    } catch (error) {
      console.error('Error al cargar el total del carrito:', error);
    }
  }

  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  trackById(index: number, producto: Product): number {
    return producto.id;
  }

  getTotal(): number {
    return this.totalCarrito;
  }
  
}