import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public pokemons = {};
  subs1: Subscription;


  constructor(private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs1 = this._pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data;
    });
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
  }

  getId(url: string) {
    return url.split("/")[6];
  }

  getImg(url: string) {
    const id = url.split("/");
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`;
    return imgUrl;
  }

  console(this) {
    console.log(this);
  }

}
