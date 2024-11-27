import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products$: Observable<any> = this.productsService
    .getProducts('http://localhost:3000/clothes', { page: 0, perPage: 5 })
    .pipe(
      map((products) => {
        return products.items;
      })
    );

  totalRecords$: Observable<number> = this.products$.pipe(
    map((products) => {
      return products.total;
    })
  );

  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id).subscribe({
      next: (data) => {
        data = this.selectedProduct;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onConfirmAdd(product: Product) {
    this.addProductSubject$.next(product);
    this.displayAddPopup = false;
    this.resetPaginator();
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    const productData$ = this.productsService.getProducts(
      'http://localhost:3000/clothes',
      { page, perPage }
    );
    this.products$ = productData$.pipe(map((data: Products) => data.items));
    this.totalRecords$ = productData$.pipe(map((data: Products) => data.total));
  }
  // napisane bez .subscribe i  nie sypie sie paginacja

  editProduct(product: Product, id: number): Observable<Product> {
    return this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .pipe(
        tap((data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        })
      );
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProductSubject$: Subject<Product> = new Subject();
  addProductObservable$: Observable<any> = this.addProductSubject$.pipe(
    switchMap((body) => {
      return this.productsService.addProduct(
        `http://localhost:3000/clothes/`,
        body
      );
    })
  );

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
