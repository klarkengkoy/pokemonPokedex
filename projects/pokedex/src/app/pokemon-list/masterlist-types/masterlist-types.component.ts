import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-masterlist-types',
  templateUrl: '../pokemon-list.component.html',
  styleUrls: ['../pokemon-list.component.css']
})
export class MasterlistTypesComponent implements OnInit, OnDestroy {

  subs1: Subscription;
  types = [];
  pokemonType: string;
  p: number;
  typeList: any;
  byTypesPagination: any;

  constructor(public routes: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.byTypesPagination = {
      currentPage: 1,
      itemsPerPage: 24
    };
  }

  ngOnInit() {
    this.subs1 = this.routes.params.pipe(
      switchMap((params) => {
        this.pokemonType = params.typeName;
        return this.pokemonService.getPokemonType(params.typeName).pipe(
          switchMap((response) => {
            this.types = response.pokemon;
            return this.pokemonService.getType();
          })
        );
      })
    ).subscribe((response) => {
      this.typeList = response.results;
    });
  }

ngOnDestroy() {
  this.subs1.unsubscribe();
}

getId(url: string) {
  return url.split('/')[6];
}

getImg(url: string) {
  const id = url.split('/');
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`;
  return imgUrl;
}

listByTypePageChange(newPage: number) {
  this.router.navigate(['type/', this.pokemonType, (this.byTypesPagination.currentPage = newPage)]);
}

}

