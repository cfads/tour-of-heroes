import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit{

  hero!:Hero;

  constructor(
    private heroService:HeroService,
    private location: Location,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getOne(id).subscribe(hero =>{
      this.hero = hero
    })
  }

  goBack(): void {
    this.location.back();
  }

  isFormValid(): boolean {
    return !!this.hero.name.trim()
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(()=>this.goBack());
  }

}
