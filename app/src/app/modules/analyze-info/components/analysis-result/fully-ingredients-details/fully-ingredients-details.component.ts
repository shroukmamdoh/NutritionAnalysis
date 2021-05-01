import { Component, Input, OnInit } from '@angular/core';
import { IngredientFullInfo, NearestDecimal } from '../../../models/ingredient-full-info.model';

@Component({
  selector: 'app-fully-ingredients-details',
  templateUrl: './fully-ingredients-details.component.html',
  styleUrls: ['./fully-ingredients-details.component.scss']
})
export class FullyIngredientsDetailsComponent implements OnInit {
  @Input()
  nutritionFacts: IngredientFullInfo
  constructor() { }
  ngOnInit(): void {
  }
  getQuntity(num) {
    return NearestDecimal.getNearestDecimal(num)
  }
}
