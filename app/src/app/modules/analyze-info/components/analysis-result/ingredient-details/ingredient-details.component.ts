import { Component, Input, OnInit } from '@angular/core';
import { NearestDecimal } from '../../../models/ingredient-full-info.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {
  @Input()
  ingredients: any
  constructor() { }

  ngOnInit(): void {
  }
  getQuntity(num) {
    return NearestDecimal.getNearestDecimal(num)
  }

}
