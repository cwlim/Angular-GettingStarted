import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { WelcomeComponent } from './home/welcome.component';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent} from './shared/star.component';
import { ConvertToSpacePipe } from './shared/convert-to-space.pipe';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([      
      {path: 'welcome', component: WelcomeComponent},      
      {path: 'products',component: ProductListComponent},
      {path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ])
  ],
  declarations: [     
    AppComponent, 
    WelcomeComponent, 
    ProductListComponent,
    StarComponent,
    ConvertToSpacePipe,
    ProductDetailComponent,
    WelcomeComponent
  ],  
  bootstrap: [AppComponent]
})
export class AppModule {}
