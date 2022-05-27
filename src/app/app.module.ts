import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenIntercepterService } from './intercepter/token-intercepter.service';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewProductComponent } from './user/view-product/view-product.component';
import { GardenerListComponent } from './user/gardener-list/gardener-list.component';
import { SearchProductComponent } from './user/search-product/search-product.component';
import { ProductByCategoryComponent } from './user/product-by-category/product-by-category.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { ViewParticularProductComponent } from './user/view-particular-product/view-particular-product.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewCartComponent } from './user/view-cart/view-cart.component';
import { ViewFavoriteComponent } from './user/view-favorite/view-favorite.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaceOrderComponent } from './user/place-order/place-order.component';
import { ViewRequestsComponent } from './user/view-requests/view-requests.component';
import { BlogsListComponent } from './user/blogs-list/blogs-list.component';
import { BlogDescriptionComponent } from './user/blog-description/blog-description.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { ViewOrderComponent } from './user/view-order/view-order.component';
import { NurserySignupComponent } from './user/nursery-signup/nursery-signup.component';
import { GardenerProfileComponent } from './user/gardener-profile/gardener-profile.component';


const socialProvider = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    providers: [

      // 204956875095-57a6uitqt7u5kq7i4tu01im83ok6u1tj.apps.googleusercontent.com
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("1001369966895-6h7jafhdsqlk1u6asklf0jbulj8c4h8q.apps.googleusercontent.com"),
      }
    ]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomePageComponent,
    ViewProductComponent,
    GardenerListComponent,
    SearchProductComponent,
    ProductByCategoryComponent,
    ContactUsComponent,
    AboutUsComponent,
    ViewParticularProductComponent,
    ViewCartComponent,
    ViewFavoriteComponent,
    PlaceOrderComponent,
    ViewRequestsComponent,
    BlogsListComponent,
    BlogDescriptionComponent,
    OrderHistoryComponent,
    ViewProfileComponent,
    ViewOrderComponent,
    NurserySignupComponent,
    GardenerProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgbModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    },
    socialProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
