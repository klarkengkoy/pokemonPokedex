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
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  public pokemonDetails;
  isHiddenStr: string;
  private is_hidden: boolean;
  subs: Subscription;
  srcImgUrl: string;
  previewUrl: string;
  goToThisId: number;
  spriteLabel: string;
  specieUrl: string
  description: string;
  evoChainUrl: string;
  defaultImage: boolean;


  constructor(public routes: ActivatedRoute, private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.defaultImage = true;
    this.subs = this.routes.params.pipe(
      switchMap((params) => {
        this.defaultImage = true;
        console.log(params);
        return this._pokemonService.getPokemonDetails(params.pokemonName).pipe(
          switchMap(response1 => {
            this.pokemonDetails = response1;
            this.specieUrl = response1.species.url;
            return this._pokemonService.getPokemonSpecies(this.specieUrl)
          })
        )
      })
    ).subscribe((response2) => {
      console.log(response2);
      for (let flavorText of response2.flavor_text_entries) {
        if (flavorText.language.name == 'en') {
          this.description = flavorText.flavor_text;
          console.log(this.description);
          break;
        }
      }
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  previewImage(imgUrl: string) {
    this.defaultImage = false;
    this.srcImgUrl = imgUrl;
    console.log(imgUrl);
    console.log(imgUrl.split("/")[8]);
    console.log(imgUrl.split("/")[9]);
    console.log(imgUrl.split("/")[10]);
    if (imgUrl.split("/")[8] === "back") {
      if (imgUrl.split("/")[9] === "shiny") {
        if (imgUrl.split("/")[10] === "female") {
          this.spriteLabel = "Back Shiny Female";
        } else {
          this.spriteLabel = "Back Shiny";
        }
      } else if (imgUrl.split("/")[9] === "female") {
        this.spriteLabel = "Back Female";
      } else {
        this.spriteLabel = "Back Default";
      }
    } else if (imgUrl.split("/")[8] === "shiny") {
      if (imgUrl.split("/")[9] === "female") {
        this.spriteLabel = "Front Shiny Female";
      } else {
        this.spriteLabel = "Front Shiny";
      }
    } else if (imgUrl.split("/")[8] === "female") {
      this.spriteLabel = "Front Female";
    } else {
      this.spriteLabel = "Front Default";
    }
    console.log(this.spriteLabel);
  }
}
