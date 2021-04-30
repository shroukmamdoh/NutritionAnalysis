import { Component, Input, OnInit } from '@angular/core';
import { IngredientFullInfo } from '../../../models/ingredient-full-info.interface';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {
  @Input()
  ingredients: []
  constructor() { }

  ngOnInit(): void {
  }

}
