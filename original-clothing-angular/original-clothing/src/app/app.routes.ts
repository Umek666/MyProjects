import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { AboutUs2Component } from './about-us/about-us-2/about-us-2.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'products/:productId',
    component: ProductPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about-us-2',
    component: AboutUs2Component,
    canActivate: [authGuard],
  },
];
