import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../../servicios/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollService } from '../../servicios/scroll.service'; 
import { AuthService } from '../../servicios/authentication.service';
import { CartService } from '../../servicios/cart.service'; 
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})


export class DetallesComponent implements OnInit {
  
  loggedIn = false;
  user: User | null = null;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private scrollService: ScrollService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.params['id']);
    await this.cargarProducto(id);
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.user = this.authService.getCurrentUser();
      console.log('Usuario actual:', this.user);
    }
  }
  
  async cargarProducto(id: number): Promise<void> {
    try {
      this.product = await this.productService.fetchProductById(id);
    } catch (error) {
      console.error(error);
    }
  }

  addToCart(): void {
    if (this.loggedIn && this.product) {
      // Asegura que userId sea válido (this.user?.idNum si usas TypeScript opcional chaining)
      const userId = this.user ? this.user.idNum : 0;
      this.cartService.agregarAlCarrito(userId, this.product.id); 
      alert('Producto agregado al carrito.');
    } else {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
    }
  }
}
