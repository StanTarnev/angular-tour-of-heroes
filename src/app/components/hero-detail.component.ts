import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">
        <h2>{{hero.name | uppercase}} Details</h2>
        <div><span>id: </span>{{hero.id}}</div>
        <div>
            <label for="hero-name">Hero name: </label>
            <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name">
        </div>
        <button type="button" (click)="goBack()">go back</button>
        <button type="button" (click)="save()">save</button>
    </div>
  `,
  styles: [`
    label {
        color: #435960;
        font-weight: bold;
    }

    input {
        font-size: 1em;
        padding: .5rem;
    }

    button {
        margin-top: 20px;
        background-color: #eee;
        padding: 1rem;
        border-radius: 4px;
        font-size: 1rem;
    }

    button:hover {
        background-color: #cfd8dc;
    }

    button:disabled {
        background-color: #eee;
    }
  `]
})
export class HeroDetailComponent {
  @Input() hero?: Hero
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }
}
