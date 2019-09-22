import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  // when using route, selector is not needed
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {  
  private _listFilter: string;  
  private _subscription: Subscription;
  products: Product[];
  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;  
  filteredProducts: Product[];
  errorMessage = '';
  
  constructor(private _productService: ProductService){}

  ngOnInit(): void {
    this._subscription = this._productService.getProducts().subscribe({
      next: products => {        
        this.products = products
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err 
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  get listFilter(){
    return this._listFilter;
  }

  set listFilter(listFilter: string) {
    this._listFilter = listFilter;
    this.filteredProducts = this._listFilter ? this._filter(listFilter) : this.products;    
  }

  onRatingClicked(message: string):void {
    this.pageTitle = 'Product List:' + message
  }

  private _filter(filterBy: string){    
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) => {
        return product.productName.toLocaleLowerCase().indexOf(filterBy) > -1;
    });
  }
}
