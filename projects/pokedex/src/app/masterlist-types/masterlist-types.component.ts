import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-masterlist-types',
  templateUrl: './masterlist-types.component.html',
  styleUrls: ['./masterlist-types.component.css']
})
export class MasterlistTypesComponent implements OnInit {

  subs1: Subscription;
  types = {};
  pokemonType: string;
  p: number; 

  constructor(public routes: ActivatedRoute, private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs1 = this.routes.params.pipe(
      switchMap((params) => {
        this.pokemonType = params.typeName;
        console.log(params);
        return this._pokemonService.getPokemonType(params.typeName)
      })
    ).subscribe((response) => {
      console.log(response);
      this.types = response.pokemon;
    })
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

}

