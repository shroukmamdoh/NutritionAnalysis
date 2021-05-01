import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ANALYZED_NUTRITION_INFO } from 'src/app/modules/shared/mock-data.json';
import { TEST_ROUTE } from '../../../shared/test-routes';
import { IngredientFullInfo } from '../../models/ingredient-full-info.model';
import { AnalysisService } from '../../services/analysis.service';
import { DataCollectionComponent } from './data-collection.component';
import { Location } from '@angular/common';
describe('DataCollectionComponent', () => {
  let component: DataCollectionComponent;
  let fixture: ComponentFixture<DataCollectionComponent>;
  let router: Router;
  let currentIngredientChange: BehaviorSubject<any> = new BehaviorSubject({});
  let toasterServiceStud;
  let testCase: IngredientFullInfo;
  let location: Location;
  const analysisService = {
    analyzeData: () => {
      return [];
    },
    currentIngredientChange: currentIngredientChange.asObservable(),
  };
  beforeEach(async () => {
    toasterServiceStud = {
      error: () => {
        return 'error message';
      },
    };
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule,
        FormsModule,
        RouterTestingModule.withRoutes(TEST_ROUTE),
      ],
      declarations: [DataCollectionComponent],
      providers: [
        { provide: FormBuilder },
        { provide: ToastrService, useValue: toasterServiceStud },
        { provide: AnalysisService, useValue: analysisService },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCollectionComponent);
    component = fixture.componentInstance;
    spyOn(toasterServiceStud, 'error').and.callFake(() => {});
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    let ingredient = '1 cup rice 10 oz chickpeas';
    component.analyzeForm.value.ingredient = ingredient;
    fixture.detectChanges();
    expect(component.analyzeForm.value.ingredient).toEqual(ingredient);
  });

  it('submitting a form', () => {
    component.submit();
    spyOn(analysisService, 'analyzeData').and.callThrough();
    expect(component.ingredientInfo).toEqual(ANALYZED_NUTRITION_INFO);
    currentIngredientChange.next(ANALYZED_NUTRITION_INFO);
    component.$currentIngredientChange.subscribe((res) => (testCase = res));
    expect(testCase).toEqual(ANALYZED_NUTRITION_INFO);
    expect(location.path().includes('home/result')).toEqual(true);
  });

  afterEach(() => {
    fixture.destroy();
  });
  it('submitting a form with wrong data', () => {
    component.analyzeForm.value.ingredient = 'xxxx';
    component.submit();
    expect(component.ingredientInfo).toBe(null);
  });
});
