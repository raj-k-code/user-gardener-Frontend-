import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { GardenerAuthService } from './service/gardener-auth.service';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { BlogDescriptionComponent } from './user/blog-description/blog-description.component';
import { BlogsListComponent } from './user/blogs-list/blogs-list.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { GardenerListComponent } from './user/gardener-list/gardener-list.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';
import { PlaceOrderComponent } from './user/place-order/place-order.component';
import { ProductByCategoryComponent } from './user/product-by-category/product-by-category.component';
import { SearchProductComponent } from './user/search-product/search-product.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ViewCartComponent } from './user/view-cart/view-cart.component';
import { ViewFavoriteComponent } from './user/view-favorite/view-favorite.component';
import { ViewParticularProductComponent } from './user/view-particular-product/view-particular-product.component';
import { ViewProductComponent } from './user/view-product/view-product.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { ViewRequestsComponent } from './user/view-requests/view-requests.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomePageComponent },
  { path: "view-product", component: ViewProductComponent },
  { path: "gardener-list", component: GardenerListComponent },
  { path: 'search-product', component: SearchProductComponent },
  { path: "product-by-category/:id", component: ProductByCategoryComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "view-particular-product/:id", component: ViewParticularProductComponent },
  // { path: "search-product/view-particular-product/:id", component: ViewParticularProductComponent },
  // { path: "product-by-category/:faltu/view-particular-product/:id", component: ViewParticularProductComponent },
  { path: "view-cart", component: ViewCartComponent, canActivate: [AuthGaurdService] },
  { path: "view-favorite", component: ViewFavoriteComponent, canActivate: [AuthGaurdService] },
  { path: "place-order", component: PlaceOrderComponent, canActivate: [AuthGaurdService] },
  { path: "view-requests", component: ViewRequestsComponent, canActivate: [AuthGaurdService, GardenerAuthService] },
  { path: "blog-list", component: BlogsListComponent },
  { path: "blog-description/:id", component: BlogDescriptionComponent },
  { path: "order-history", component: OrderHistoryComponent },
  { path: "view-profile", component: ViewProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
