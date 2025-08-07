import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/intefaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {


  public pokemon = signal<Pokemon | null>(null);
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit() {

    const id  = this.route.snapshot.paramMap.get('id');

    if(!id) return;
    this.pokemonService.loadPokemon(id)
    .pipe(
      tap(({name , id}) => {
        this.title.setTitle(`#${id}-${name}`);
        this.meta.updateTag({ name: 'description', content: `Details about ${name}` });
        this.meta.updateTag({ name: 'og:description', content: `Details about ${name}` });
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` });
      })
    )
    .subscribe((pokemon) => {
      this.pokemon.set(pokemon);
    })
  }
}
