import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product$!: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('productId'))),
      switchMap((id) => this.productsService.getProductById(id))
    );
  }
}

// ngOnInit(): void {
//   const id = Number(this.route.snapshot.paramMap.get('productId'));
//   console.log(id);
//   this.product$ = this.productsService.getProductById(id).pipe(
//     tap((product: Product) => {
//       console.log(product);
//     })
//   );
// }
