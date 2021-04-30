import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IngredientFullInfo } from '../../models/ingredient-full-info.interface';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {
  private _destroy$ = new Subject();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  ingredientInfo: IngredientFullInfo
  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
    this.analysisService.currentIngredientChange.pipe(takeUntil(this._destroy$)).subscribe((result: IngredientFullInfo) => {
      this.ingredientInfo = result
      console.log('result', result)
    })
  }

}
