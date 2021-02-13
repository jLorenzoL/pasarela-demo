import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { CartComponent } from './component/cart/cart.component';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { ModalComponent } from './component/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


//external
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPayPalModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
