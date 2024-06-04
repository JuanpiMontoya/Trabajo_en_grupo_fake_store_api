import {Component, Input} from '@angular/core';
import {Product} from "../../interfaces/product";
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
 selector: 'app-producto',
 standalone: true,
 imports: [RouterLink],
 templateUrl: './product.component.html',
 styleUrl: './product.component.scss'
})
export class ProductComponent {
 @Input() product!: Product;
}
