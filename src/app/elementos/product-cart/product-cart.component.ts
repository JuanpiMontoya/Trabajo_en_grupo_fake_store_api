import { Component, Input } from '@angular/core';
import { Product } from "../../interfaces/product";
import { RouterLink } from '@angular/router';
import { CartService } from '../../servicios/cart.service';
import { AuthService } from '../../servicios/authentication.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent {
  @Input() product_cart!: Product;

  constructor(private cartService: CartService,private authService: AuthService) {}

  agregarAlCarrito() {
    if (!this.product_cart || !this.product_cart.id) {
      console.error('Error: Producto no válido');
      return;
    }

    // Ejemplo: Obtener el userId desde el servicio de autenticación
    const user = this.authService.getCurrentUser(); // Asume que tienes un método para obtener el userId

    // Verificar que userId no sea null o undefined
    if (!user?.idNum) {
      console.error('Error: Usuario no autenticado');
      return;
    }

    // Llamar al servicio para agregar al carrito
    this.cartService.agregarAlCarrito(user.idNum, this.product_cart.id);
  }

  incrementarCantidad() {
    this.product_cart.quantity++;
    this.actualizarCarrito();
  }

  async decrementarCantidad() {
    if (this.product_cart.quantity > 1) {
      this.product_cart.quantity--;
      await this.actualizarCarrito();
    }
  }

  actualizarCarrito() {
    this.cartService.actualizarProductoEnCarrito(this.product_cart);
  }
}