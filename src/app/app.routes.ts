import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listing',
    loadComponent: () =>
      import('./listing/listing.page').then((m) => m.ListingPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'listing/:id',
    loadComponent: () =>
      import('./listing/listing.page').then((m) => m.ListingPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'add-prop',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./add-prop/add-prop.page').then((m) => m.AddPropPage),
  },
];
