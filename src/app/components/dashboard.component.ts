import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Top Heroes</h2>
    <div class="heroes-menu">
      <a 
        *ngFor="let hero of heroes"
        routerLink="/detail/{{hero.id}}"
      >
        {{hero.name}}
      </a>
    </div>
    <app-hero-search/>
  `,
  styles: [`
    /* DashboardComponent's private CSS styles */

    h2 {
        text-align: center;
    }
      
    .heroes-menu {
      padding: 0;
      margin: auto;
      max-width: 1000px;
    
      /* flexbox */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: flex-start;
      align-items: flex-start;
    }
      
    a {
      background-color: #3f525c;
      border-radius: 2px;
      padding: 1rem;
      font-size: 1.2rem;
      text-decoration: none;
      display: inline-block;
      color: #fff;
      text-align: center;
      width: 100%;
      min-width: 70px;
      margin: .5rem auto;
      box-sizing: border-box;
    
      /* flexbox */
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
    }
      
    @media (min-width: 600px) {
      a {
        width: 18%;
        box-sizing: content-box;
      }
    }
    
    a:hover {
      background-color: #000;
    }
  `]
})
export class DashboardComponent {
  heroes: Hero[] = []

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}
