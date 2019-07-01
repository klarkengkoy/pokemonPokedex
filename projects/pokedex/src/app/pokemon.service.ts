import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonDetails } from './pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=999';
  private url1 = 'https://pokeapi.co/api/v2/type';
  private url2 = 'https://pokeapi.co/api/v2/pokemon';


  constructor(public http: HttpClient) { }

  getPokemons(): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.url);
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.url2}/${name}`);
  }

  getPokemonSpecies(speciesUrl: string): Observable<Pokemon> {
    return this.http.get<any>(speciesUrl);
  }

  getEvolutionChain(evoChainUrl: string): Observable<Pokemon> {
    return this.http.get<any>(evoChainUrl);
  }

  getPokemonType(typeName: string): Observable<PokemonDetails>{
    return this.http.get<any>(`${this.url1}/${typeName}`);
  }

  getType(): Observable<Pokemon> {
    return this.http.get<any>(this.url1);
  }
}
