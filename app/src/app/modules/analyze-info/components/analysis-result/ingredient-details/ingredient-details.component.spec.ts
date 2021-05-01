import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANALYZED_NUTRITION_INFO } from 'src/app/modules/shared/mock-data.json';
import { IngredientDetailsComponent } from './ingredient-details.component';

describe('IngredientDetailsComponent', () => {
  let component: IngredientDetailsComponent;
  let fixture: ComponentFixture<IngredientDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[],
      providers:[],
      declarations: [ IngredientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDetailsComponent);
    component = fixture.componentInstance;
    component.ingredients = ANALYZED_NUTRITION_INFO.ingredients
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input data', () => {
    expect(component.ingredients).toEqual(ANALYZED_NUTRITION_INFO.ingredients)
  });

  it('should get nearest decimal', () => {
    expect(component.getQuntity(1.5555)).toEqual(1.56)
  });
});
