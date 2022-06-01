import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { GardenerAuthService } from './service/gardener-auth.service';
import { AboutUsComponent } from './commponent/about-us/about-us.component';
import { BlogDescriptionComponent } from './commponent/blog-description/blog-description.component';
import { BlogsListComponent } from './commponent/blogs-list/blogs-list.component';
import { ContactUsComponent } from './commponent/contact-us/contact-us.component';
import { GardenerListComponent } from './commponent/gardener-list/gardener-list.component';
import { GardenerProfileComponent } from './commponent/gardener-profile/gardener-profile.component';
import { NurserySignupComponent } from './commponent/nursery-signup/nursery-signup.component';
import { OrderHistoryComponent } from './commponent/order-history/order-history.component';
import { PlaceOrderComponent } from './commponent/place-order/place-order.component';
import { ProductByCategoryComponent } from './commponent/product-by-category/product-by-category.component';
import { SearchProductComponent } from './commponent/search-product/search-product.component';
import { SigninComponent } from './commponent/signin/signin.component';
import { SignupComponent } from './commponent/signup/signup.component';
import { ViewCartComponent } from './commponent/view-cart/view-cart.component';
import { ViewFavoriteComponent } from './commponent/view-favorite/view-favorite.component';
import { ViewOrderComponent } from './commponent/view-order/view-order.component';
import { ViewParticularProductComponent } from './commponent/view-particular-product/view-particular-product.component';
import { ViewProductComponent } from './commponent/view-product/view-product.component';
import { ViewProfileComponent } from './commponent/view-profile/view-profile.component';
import { ViewRequestsComponent } from './commponent/view-requests/view-requests.component';
import { AcceptedRequestComponent } from './commponent/accepted-request/accepted-request.component';

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
  { path: "view-profile", component: ViewProfileComponent },
  { path: "order-history/view-order/:id", component: ViewOrderComponent, canActivate: [AuthGaurdService] },
  { path: "nursery-signup", component: NurserySignupComponent },
  { path: "gardener-profile/:id", component: GardenerProfileComponent },
  { path: "accepted-request", component: AcceptedRequestComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
