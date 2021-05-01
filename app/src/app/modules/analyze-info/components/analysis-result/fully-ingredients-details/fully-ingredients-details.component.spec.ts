import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANALYZED_NUTRITION_INFO } from 'src/app/modules/shared/mock-data.json';

import { FullyIngredientsDetailsComponent } from './fully-ingredients-details.component';

describe('FullyIngredientsDetailsComponent', () => {
  let component: FullyIngredientsDetailsComponent;
  let fixture: ComponentFixture<FullyIngredientsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullyIngredientsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullyIngredientsDetailsComponent);
    component = fixture.componentInstance;
    component.nutritionFacts = ANALYZED_NUTRITION_INFO
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input data', () => {
    expect(component.nutritionFacts.calories).toEqual(1773)
  });

  it('should get nearest decimal', () => {
    expect(component.getQuntity(1.5555)).toEqual(1.56)
  });
});
