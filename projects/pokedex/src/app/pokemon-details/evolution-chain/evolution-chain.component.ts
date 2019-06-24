import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Species, Chain } from '../../pokemon';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})
export class EvolutionChainComponent implements OnInit, OnDestroy {

  subs: Subscription;
  chain: Chain;
  species: Species;

  constructor(public routes: ActivatedRoute, private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs = this.routes.params.pipe(
      switchMap((params) => {
        console.log(params);
        return this._pokemonService.getPokemonDetails(params.pokemonName).pipe(
          switchMap(response1 => {
            console.log(response1)
            return this._pokemonService.getPokemonSpecies(response1.species.url).pipe(
              switchMap(response2 => {
                console.log(response2);
                return this._pokemonService.getEvolutionChain(response2.evolution_chain.url);
              })
            )
          })
        )
      })
    ).subscribe((response3) => {
      console.log(response3);
      console.log(response3.chain.species.name)
      this.chain = response3.chain;
      


    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
  getImg(url: string) {
    const id = url.split("/");
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[6]}.png`;
    return imgUrl;
  }

}

