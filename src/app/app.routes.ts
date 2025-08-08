import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component')
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component')
  },
  // {
  //   path: 'pokemons',
  //   loadComponent: () => import('./pages/pokemons/pokemons-page.component')
  // },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component')
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component')
  },
  {
    path: '**',
    redirectTo: 'about' // Default route if no match found
  }
];
