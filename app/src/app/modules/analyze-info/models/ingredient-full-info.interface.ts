import { Ingredient } from './ingredient.interface';

export interface IngredientFullInfo {
  calories: number;
  cautions: [];
  dietLabels: [];
  healthLabels: [];
  ingredients: [{ text: string; parsed: [Ingredient] }];
  totalDaily: {};
  totalNutrients: {};
  totalWeight: number;
  yield: number;
}
