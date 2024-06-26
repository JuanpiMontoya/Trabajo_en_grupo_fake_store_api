import { Component, Input } from '@angular/core';
import { Product } from "../../interfaces/product";
import { RouterLink } from '@angular/router';
import { CartService } from '../../servicios/cart.service';

@Component({
    selector: 'app-product-cart',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './product-cart.component.html',
    styleUrl: './product-cart.component.scss'
})

export class ProductCartComponent {
  @Input() product_cart!: Product;

  constructor(private cartService: CartService) {}

  agregarAlCarrito() {
    const productoParaAgregar: Product = { ...this.product_cart, quantity: 1 }; 
    this.cartService.agregarAlCarrito(productoParaAgregar);
  }

  eliminarDelCarrito(index: number) {
    this.cartService.eliminarDelCarrito(index);
  }

  incrementarCantidad() {
    this.product_cart.quantity++;
    this.actualizarCarrito();
  }

  actualizarCarrito() {
    this.cartService.actualizarProductoEnCarrito(this.product_cart);
  }
}
