import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  public pokemons = [];
  subs1: Subscription;
  typeList: any;
  shouldNotRemove: boolean;
  p: number;


  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs1 = this.pokemonService.getType().pipe(
      switchMap(response => {
        console.log(response);
        this.typeList = response.results;
        return this.pokemonService.getPokemons()
      })
    ).subscribe((data: Pokemon) => {
      this.pokemons = data.results;
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

}
