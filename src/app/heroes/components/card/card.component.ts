import {  Component, Input, type OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
    selector: 'heroes-hero-card',
    templateUrl: './card.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
})
export class CardComponent implements OnInit {

  @Input()
  public hero !: Hero;
    ngOnInit(): void {
      if (!this.hero) throw Error('Hero property is required');


    }

}
