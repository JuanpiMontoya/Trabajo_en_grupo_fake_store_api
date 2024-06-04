import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../interfaces/product';
import { Router, ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit {
  product: Product | undefined;
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService,private router: Router,private elementRef: ElementRef){ }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.cargarProducto(id);
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngAfterViewInit(): void {
    // Seleccionar el primer div por defecto
    const firstAdvantage = document.getElementById('first-advantage');
    if (firstAdvantage) {
      firstAdvantage.classList.add('clicked');
    }
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
  
  async cargarProducto(id: number) {
    try {
      this.product = await this.productService.fetchProductById(id);
    } catch (error) {
      console.error(error);
    }
  }

  addToCart(): void {
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
