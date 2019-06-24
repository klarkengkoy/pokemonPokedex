import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _url: string = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=999";
  private _url2: string = "https://pokeapi.co/api/v2/pokemon";


  constructor(public http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this._url);
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this._url2}/${name}`);    
  }

  getPokemonSpecies(speciesUrl: string): Observable<Pokemon> {
    return this.http.get<any>(speciesUrl);
  }
  
  getEvolutionChain(evoChainUrl: string): Observable<Pokemon> {
    return this.http.get<any>(evoChainUrl);
  }
}
