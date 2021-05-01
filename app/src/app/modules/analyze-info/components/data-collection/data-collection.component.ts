import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnalysisService } from '../../services/analysis.service';
import { IngredientFullInfo } from '../../models/ingredient-full-info.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.scss'],
})
export class DataCollectionComponent implements OnInit {
  private _destroy$ = new Subject();
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  analyzeForm: FormGroup;
  ingredientInfo: IngredientFullInfo
  $currentIngredientChange = this.analysisService.currentIngredientChange
  constructor(
    private analysisService: AnalysisService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.analyzeForm = this.fb.group({
      ingredient: new FormControl('', { validators: [Validators.required] }),
    });
  }

  submit() {
    const ingredientArray = this.getMultiLines(this.analyzeForm.value.ingredient)
    this.analysisService
      .analyzeData(ingredientArray)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (data: IngredientFullInfo) => {
          this.ingredientInfo = data
          if (data.totalWeight) {
            this.$currentIngredientChange.next(this.ingredientInfo);
            this.router.navigateByUrl('home/result');
          } else {
            this.toastrService.error(
              `Make sure you enter right data`,
              `Failed to submit the recipe`
            );
          }
        },
        (error) => {
          this.toastrService.error(
            `${Object.values(error.error).reduce(
              (a: string, b: string) => a + ' ' + b
            )}`,
            `Failed to submit the recipe`
          );
        }
      );
  }

  getMultiLines(text) {
    return text.split(/\r?\n/);
  }
}
