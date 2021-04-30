import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IngredientFullInfo } from '../models/ingredient-full-info.interface';
@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  appId = '47379841';
  appKey = 'd28718060b8adfd39783ead254df7f92';
  currentIngredient = {};
  public currentIngredientChange: BehaviorSubject<any> = new BehaviorSubject(
    this.currentIngredient
  );
  constructor(private http: HttpClient) {}
  analyzeData(ingredient) {
    return this.http.post(
      `${environment.apiUrl}nutrition-details?app_id=${this.appId}&app_key=${this.appKey}`,
      {
        ingr: ingredient,
      }
    );
  }
}
