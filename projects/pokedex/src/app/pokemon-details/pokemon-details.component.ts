import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonDetails } from '../pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  public pokemonDetails = new Pokemon();
  isHiddenStr: string;
  private is_hidden: boolean;
  subs: Subscription;
  srcImgUrl: string;
  previewUrl: string;
  imgClass: string;
  goToThisId: number;

  constructor(public routes: ActivatedRoute, private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs = this.routes.params.pipe(
      switchMap((params) => {
        console.log(params.pokemonName);
        return this._pokemonService.getPokemonDetails(params.pokemonName);
      })
    ).subscribe((response: Pokemon) => {
      console.log(response);
      this.pokemonDetails = response;
      this.srcImgUrl = "https://thumbs.gfycat.com/RemorsefulIllustriousDog-small.gif";
      this.imgClass = "defaultBigImg"
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  checkIfHidden(isHiddenStr) {
    console.log(isHiddenStr);
    if (isHiddenStr == "true") {
      this.is_hidden = true;
    } else {
      this.is_hidden = false;
    }
    console.log(this.is_hidden);
    return this.is_hidden;
  }

  previewImage(imgUrl: string) {
    this.srcImgUrl = imgUrl;
    console.log(imgUrl);
    this.imgClass = "withSprites";
  }

  asd(){
    console.log("asd");
  }
}
