import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../intefaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {

  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon().id}.png`);

  //se ejecuta cada vez que cambia la señal
  // logEffect = effect(() => {
  //   console.log('PokemonCardComponent', this.pokemon());
  // })

}
