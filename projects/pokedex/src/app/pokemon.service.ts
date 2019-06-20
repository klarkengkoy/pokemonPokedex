import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Pokemon, PokemonDetails } from './pokemon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _url: string = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9999";
  private _url2: string = "https://pokeapi.co/api/v2/pokemon";


  constructor(public http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this._url);
  }


  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<any>(`${this._url2}/${name}`);    
  }
}
