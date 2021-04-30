import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCollectionComponent } from './components/data-collection/data-collection.component';
import { AnalysisResultComponent } from './components/analysis-result/analysis-result.component';
import { IngredientDetailsComponent } from './components/analysis-result/ingredient-details/ingredient-details.component';
import { FullyIngredientsDetailsComponent } from './components/analysis-result/fully-ingredients-details/fully-ingredients-details.component';
import { AnalyzeInfoRoutingModule } from './analyze-info-routing.module';

@NgModule({
  declarations: [
    DataCollectionComponent,
    AnalysisResultComponent,
    IngredientDetailsComponent,
    FullyIngredientsDetailsComponent,
  ],
  imports: [CommonModule, AnalyzeInfoRoutingModule],
})
export class AnalyzeInfoModule {}
