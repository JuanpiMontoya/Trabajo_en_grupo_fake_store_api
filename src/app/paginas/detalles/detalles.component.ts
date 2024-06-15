import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from '../../servicios/product.service';
import { Product } from '../../interfaces/product';
import { Router, ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollService } from '../../servicios/scroll.service'; 


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})

export class DetallesComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private productService: ProductService,private router: Router,private scrollService: ScrollService, private elementRef: ElementRef){ }

  loggedIn: boolean = false;

  //Cargamos los datos del producto y verificamos el inicio de sesión

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.cargarProducto(id);
    const logged = sessionStorage.getItem('loggedIn');
    if (logged === 'true') {
      this.loggedIn = true;
    }
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
    console.log("valor Logged In" + this.loggedIn)
    if (this.loggedIn && this.product) {
      const productId = this.product.id;
      let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      if (!cart[productId]) {
        cart[productId] = 0;
      }
      cart[productId]++;
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`Producto registrado en el carrito, Cantidad: ${cart[productId]}`);
    } else {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
    }
  }
}