import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
