import { Component, Input, OnInit } from '@angular/core';
import { IngredientFullInfo } from '../../../models/ingredient-full-info.interface';

@Component({
  selector: 'app-fully-ingredients-details',
  templateUrl: './fully-ingredients-details.component.html',
  styleUrls: ['./fully-ingredients-details.component.scss']
})
export class FullyIngredientsDetailsComponent implements OnInit {
  @Input()
  nutritionFacts: IngredientFullInfo
  constructor() { }
  getQuntity(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }
  ngOnInit(): void {
  }

}
