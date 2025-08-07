import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponse, SimplePokemon } from '../intefaces';
import { Pokemon } from '../intefaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);


  public loadPage(page: number): Observable<SimplePokemon[]> {

    if (page !== 0) {
      page--;
    }

    page = Math.max(page, 0);
    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map(resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => (
          {
            name: pokemon.name,
            id: pokemon.url.split('/').slice(-2)[0]

          }));
        return simplePokemons;
      }),

      // tap(console.log)
    );
  }

  public loadPokemon(id: string): Observable<Pokemon>{
   return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
   // .pipe(
      // tap(pokemon => {
      //   pokemon.cries = {
      //     latest: `https://play.pokemonshowdown.com/audio/cries/${pokemon.name}.mp3`,
      //     legacy: `https://play.pokemonshowdown.com/audio/cries/${pokemon.id}.mp3`
      //   };
      // })
    // );
  }


}
