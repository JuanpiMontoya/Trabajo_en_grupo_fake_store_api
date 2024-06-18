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

  listaDeProductos_Carrito: Product[] = []; 
  
  constructor(private cartService: CartService,private scrollService: ScrollService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.cargarProductosCarrito();
    alert("Si deseas eliminar todos los productos de tu carrito recarga la página")
  }

  cargarProductosCarrito() {
    this.listaDeProductos_Carrito = this.cartService.getProductos();
  }

  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  trackById(index: number, producto: Product): string {
    return producto.id;
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
  
}