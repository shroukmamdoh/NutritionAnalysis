import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { ANALYZED_NUTRITION_INFO } from 'src/app/modules/shared/mock-data.json';
import { TEST_ROUTE } from 'src/app/modules/shared/test-routes';
import { IngredientFullInfo } from '../../models/ingredient-full-info.model';
import { AnalysisService } from '../../services/analysis.service';
import { Location } from '@angular/common'
import { AnalysisResultComponent } from './analysis-result.component';
import { of } from 'rxjs'
describe('AnalysisResultComponent', () => {
  let component: AnalysisResultComponent;
  let fixture: ComponentFixture<AnalysisResultComponent>;
  let currentIngredientChange: BehaviorSubject<any> = new BehaviorSubject({});
  let testCase: IngredientFullInfo;
  let location: Location;
  const analysisService = {
    currentIngredientChange: currentIngredientChange.asObservable(),
  };
  let $currentIngredientChangeFack : BehaviorSubject<any> = new BehaviorSubject(
    ANALYZED_NUTRITION_INFO
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(TEST_ROUTE)],
      providers: [{ provide: AnalysisService, useValue: analysisService }],
      declarations: [AnalysisResultComponent],
    }).compileComponents();
    location = TestBed.inject(Location)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisResultComponent);
    component = fixture.componentInstance;
    component.$currentIngredientChange = $currentIngredientChangeFack
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the data', () => {
    component.$currentIngredientChange.subscribe((res) => (testCase = res));
    expect(testCase).toEqual(ANALYZED_NUTRITION_INFO);
  });

  it('should navigate back to home page', () => {
    component.navigateToHome()
    expect(location.path().includes('home')).toEqual(false)
  });

  it('should show the nutrition facts', () => {
    component.showNutritionFacts()
    expect(component.isShowNutritionFacts).toEqual(true)
  });
});
