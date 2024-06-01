import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService){ }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.cargarProducto(id);
  }

  async cargarProducto(id: number){
    try{
      this.product = await this.productService.fetchProductById(id);
    }catch(error){
      console.error(error);
    }
  }
}
