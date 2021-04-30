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
import { IngredientFullInfo } from '../../models/ingredient-full-info.interface';
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
    const ingredientArray = this.analyzeForm.value.ingredient.split(/\r?\n/);
    this.analysisService
      .analyzeData(ingredientArray)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (data: IngredientFullInfo) => {
          console.log('data', data);

          if (data.totalWeight) {
            this.analysisService.currentIngredientChange.next(data);
            this.router.navigateByUrl('home/result');
          } else {
            this.toastrService.error(
              `Make sure you enter right data`,
              `Failed to submit the recipe`
            );
          }
        },
        (error) => {
          console.log('error', error);
          this.toastrService.error(
            `${Object.values(error.error).reduce(
              (a: string, b: string) => a + ' ' + b
            )}`,
            `Failed to submit the recipe`
          );
        }
      );
  }
}
