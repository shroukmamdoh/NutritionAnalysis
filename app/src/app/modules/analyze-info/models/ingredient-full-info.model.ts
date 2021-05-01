import { Ingredient } from '../interfaces/ingredient.interface';

export interface IngredientFullInfo {
  uri: string;
  calories: number;
  cautions: [];
  dietLabels?: [''];
  healthLabels?: [];
  ingredients: [{ text: string; parsed: [Ingredient] }, {}];
  totalDaily: {};
  totalNutrients: {};
  totalWeight: number;
  yield: number;
}

export class NearestDecimal {
  /**
   * @method getNearestDecimal get the nearest digits after the decimal point
   * @param startDate The decimal number
   */
  static getNearestDecimal(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
