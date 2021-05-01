export interface Ingredient {
  quantity: number;
  weight: number;
  retainedWeight: number;
  food: string;
  foodId: string;
  foodMatch: string;
  measure: string;
  measureURI: string;
  nutrients?: {};
  status: string;
}
