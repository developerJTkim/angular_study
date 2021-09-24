import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes'

import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  heroes:Hero[] = []
  selectedHero?: Hero
  constructor(private heroService: HeroService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  onSelect(hero: Hero){
    this.selectedHero = hero
    this.messageService.add(`HeroesComponent: Selected hero id =${hero.id}`)
  }

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => {
        console.log(heroes)
        this.heroes = heroes
      })
  }

  add(name: string): void{
    name = name.trim()
    if (!name) { return }
    this.heroService.addHero({ name } as Hero)
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

}