import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy{

 public pokemonDetails = {};
 isHiddenStr : string;
 private is_hidden : boolean;
 subs: Subscription;

  constructor(public routes: ActivatedRoute, private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs = this.routes.params.pipe(
      switchMap((params) => {
        console.log(params.pokemonName);
        return this._pokemonService.getPokemonDetails(params.pokemonName);
      })
    ).subscribe((response) => {
      console.log(response);
      this.pokemonDetails = response;
    });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  checkIfHidden(isHiddenStr){
    console.log(isHiddenStr);
    if (isHiddenStr == "true"){
      this.is_hidden = true;
    } else {
      this.is_hidden = false;
    }
    console.log(this.is_hidden);
    return this.is_hidden;
  }

}
