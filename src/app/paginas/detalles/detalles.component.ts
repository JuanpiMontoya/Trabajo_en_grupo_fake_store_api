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
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private scrollService: ScrollService,
    private elementRef: ElementRef,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  loggedIn: boolean = false;
  user: User | null = null; // Variable para almacenar la información del usuario

  // Variable para almacenar el producto actual
  product: Product | undefined;

  //Cargamos los datos del producto y verificamos el inicio de sesión

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.params['id']);
    await this.cargarProducto(id); // Espera a cargar el producto antes de verificar el inicio de sesión
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.user = this.authService.getCurrentUser(); // Obtener el usuario actualmente autenticado
    }
  }
  
  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }

  async cargarProducto(id: number): Promise<void> {
    try {
      this.product = await this.productService.fetchProductById(id);
    } catch (error) {
      console.error(error);
    }
  }

  addToCart(): void {
    if (this.loggedIn && this.product && this.user) {
      this.cartService.agregarAlCarrito(this.user.idNum, this.product.id); // Envía el ID del usuario
      alert('Producto agregado al carrito.');
    } else {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
    }
  }
}