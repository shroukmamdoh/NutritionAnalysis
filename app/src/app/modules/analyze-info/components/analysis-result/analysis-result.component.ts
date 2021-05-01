import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IngredientFullInfo } from '../../models/ingredient-full-info.model';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss'],
})
export class AnalysisResultComponent implements OnInit {
  private _destroy$ = new Subject();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  ingredientInfo: IngredientFullInfo;
  isShowNutritionFacts = false;
  $currentIngredientChange = this.analysisService.currentIngredientChange
  constructor(
    private analysisService: AnalysisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$currentIngredientChange.pipe(takeUntil(this._destroy$))
      .subscribe((result: IngredientFullInfo) => {
        this.ingredientInfo = result;
      });
  }
  navigateToHome() {
    this.router.navigateByUrl('home');
  }
  showNutritionFacts() {
    this.isShowNutritionFacts = true;
  }
}
