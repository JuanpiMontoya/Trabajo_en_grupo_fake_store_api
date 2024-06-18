import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../../servicios/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollService } from '../../servicios/scroll.service'; 
import { AuthService } from '../../servicios/authentication.service';
import { CartService } from '../../servicios/cart.service'; 



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

  //Cargamos los datos del producto y verificamos el inicio de sesión

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.cargarProducto(id);
    this.loggedIn = this.authService.isLoggedIn();
  }
  

  //Insertamos el servicio scroll 

  ngAfterViewInit(): void {
    this.scrollService.applyScroll(this.elementRef);
  }
  
  product: Product | undefined;
  
  async cargarProducto(id: number) {
    try {
      this.product = await this.productService.fetchProductById(id);
    } catch (error) {
      console.error(error);
    }
  }

  //Función para añadir al carrito

  addToCart(): void {
    if (this.loggedIn && this.product) {
      this.cartService.agregarAlCarrito(this.product);
      alert('Producto agregado al carrito.');
    } else {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
    }
  }
  
}