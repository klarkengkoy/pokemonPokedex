import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public pokemons = {};


  constructor(private _pokemonService: PokemonService) { }

  ngOnInit() {
    this._pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data;
    });
  }

  getId(url: string) {
    const id = url.split("/");
    return id[6];
  }

  getImg(url: string) {
    const id = url.split("/");
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`;
    return imgUrl;
  }

}
