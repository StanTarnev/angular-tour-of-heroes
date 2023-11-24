import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  template: `
    <h2>My Heroes</h2>
    <div>
      <label for="new-hero">Hero name: </label>
      <input id="new-hero" #heroName>
      <button type="button" class="add-button" (click)="add(heroName.value); heroName.value=''" >
          Add hero
      </button>
    </div>
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <a routerLink="/detail/{{hero.id}}">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </a>
        <button
          type="button"
          class="delete"
          title="delete hero"
          (click)="delete(hero)"
        >
          x
        </button>
      </li>
    </ul>
  `,
  styles: [`
    .add-button {
      padding: .5rem 1.5rem;
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .add-button:hover {
      color: white;
      background-color: #42545C;
    }

    button.delete {
      position: absolute;
      left: 210px;
      top: 5px;
      background-color: white;
      color: #525252;
      font-size: 1.1rem;
      margin: 0;
      padding: 1px 10px 3px 10px;
    }

    button.delete:hover {
        background-color: #525252;
        color: white;
    }
  `]
})
export class HeroesComponent {
  heroes: Hero[] = []

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim()
    if (!name) { return }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
