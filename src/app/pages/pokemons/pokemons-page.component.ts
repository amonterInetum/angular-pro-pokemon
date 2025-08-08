import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/intefaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements  OnDestroy {
  public isLoading = signal(false);
  private pokemonsService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params =>  params['page'] ?? 1 ),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)),
    )
  );

  public loadOnPageChange = effect(() => {
    this.loadPokemon(this.currentPage())
  }, {
    allowSignalWrites: true, // Permite escribir en señales dentro del efecto
  })

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //     console.log('App is stable:', isStable);
  //   });


  // ngOnInit(): void {
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);

  //   this.route.queryParamMap.subscribe((params) => {
  //     console.log('Query params:', params.get('page'));
  //   });
  //   this.loadPokemon();
  // }

  public loadPokemon(page = 0) {
    // this.pokemonsService.loadPage(page).subscribe((pokemons) =>{
    //   this.pokemons.set(pokemons);
    // })
    // ==
    console.log('Loading pokemons for page:', this.currentPage());

    const pageToLoad = this.currentPage()! + page;

    this.currentPage

    this.pokemonsService.loadPage(pageToLoad).pipe(
      //no navega(carga dos veces) ya que el array esta vacio
      // tap(() => this.router.navigate([], {queryParams: { page: pageToLoad } })),
      tap( () => this.title.setTitle(`Pokemons - Page ${pageToLoad}`)),
    ).subscribe(this.pokemons.set)
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }
}
