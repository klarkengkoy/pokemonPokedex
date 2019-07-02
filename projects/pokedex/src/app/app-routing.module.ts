import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { MasterlistTypesComponent } from './pokemon-list/masterlist-types/masterlist-types.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: PokemonListComponent },
  { path: 'list/:page', component: PokemonListComponent },
  { path: 'details/:pokemonName', component: PokemonDetailsComponent },
  { path: 'type/:typeName', component: MasterlistTypesComponent },
  { path: 'type/:typeName/:page', component: MasterlistTypesComponent },
  { path: '*', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, PokemonListComponent,
  PokemonDetailsComponent, PageNotFoundComponent, MasterlistTypesComponent];
