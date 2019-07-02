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
  subs: Subscription;
  srcImgUrl: string;
  previewUrl: string;
  goToThisId: number;
  spriteLabel: string;
  specieUrl: string;
  description: string;
  evoChainUrl: string;
  defaultImage: boolean;


  constructor(public routes: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.defaultImage = true;
    this.subs = this.routes.params.pipe(
      switchMap((params) => {
        this.defaultImage = true;
        return this.pokemonService.getPokemonDetails(params.pokemonName).pipe(
          switchMap(response1 => {
            this.pokemonDetails = response1;
            this.specieUrl = response1.species.url;
            return this.pokemonService.getPokemonSpecies(this.specieUrl)
          })
        )
      })
    ).subscribe((response2) => {
      for (const flavorText of response2.flavor_text_entries) {
        if (flavorText.language.name === 'en') {
          this.description = flavorText.flavor_text;
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
    if (imgUrl.split('/')[8] === 'back') {
      if (imgUrl.split('/')[9] === 'shiny') {
        if (imgUrl.split('/')[10] === 'female') {
          this.spriteLabel = 'Back Shiny Female';
        } else {
          this.spriteLabel = 'Back Shiny';
        }
      } else if (imgUrl.split('/')[9] === 'female') {
        this.spriteLabel = 'Back Female';
      } else {
        this.spriteLabel = 'Back Default';
      }
    } else if (imgUrl.split('/')[8] === 'shiny') {
      if (imgUrl.split('/')[9] === 'female') {
        this.spriteLabel = 'Front Shiny Female';
      } else {
        this.spriteLabel = 'Front Shiny';
      }
    } else if (imgUrl.split('/')[8] === 'female') {
      this.spriteLabel = 'Front Female';
    } else {
      this.spriteLabel = 'Front Default';
    }
  }

  getDefaultSrc() {
    if (this.pokemonDetails.sprites.front_default === null){
      return 'https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG';
    } else {
      return this.pokemonDetails.sprites.front_default;
    }
  }
}
