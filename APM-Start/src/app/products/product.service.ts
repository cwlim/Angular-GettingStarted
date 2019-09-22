import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Product } from "./product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private _productUrl = "api/products/products.json";

  constructor(private _httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this._productUrl).pipe(
      tap( (data) => console.log(`ALL: ${JSON.stringify(data)}`)),
      catchError( this._handleError )
    );
  }

  private _handleError(err: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
