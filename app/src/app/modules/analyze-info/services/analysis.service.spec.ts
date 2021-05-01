import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AnalysisService } from './analysis.service';
import { TEST_ROUTE } from '../../shared/test-routes';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ANALYZED_NUTRITION_INFO } from '../../shared/mock-data.json';
describe('AnalysisService', () => {
  let service: AnalysisService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(TEST_ROUTE),
      ],
    });
    service = TestBed.inject(AnalysisService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send ingredients', () => {
    const ingredients = ['1 cup rice', '10 oz chickpeas'];
    service.analyzeData(ingredients).subscribe((res) => {
      expect(res).toEqual(ANALYZED_NUTRITION_INFO);
    });
    const req = httpTestingController.expectOne(
      'https://api.edamam.com/api/nutrition-details?app_id=47379841&app_key=d28718060b8adfd39783ead254df7f92'
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      ingr: ingredients,
    });
    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: ANALYZED_NUTRITION_INFO,
    });
    req.event(expectedResponse);
  });

  /*
   * Unauthorized error, it happened when i send wrong app_key or wrong app_id
   * now i try send wrong app_id
   */

  it('should turn 401 error into return of the requested ingredients', () => {
    const ingredients = ['1 cup rice', '10 oz chickpeas'];
    service
      .analyzeData(ingredients)
      .subscribe(
        (res) =>
          expect(res).toEqual(
            ANALYZED_NUTRITION_INFO,
            'should return the ANALYZED_NUTRITION_INFO'
          ),
        fail
      );
    const req = httpTestingController.expectOne(
      'https://api.edamam.com/api/nutrition-details?app_id=47379841&app_key=d28718060b8adfd39783ead254df7f92'
    );
    const msg = '401 error';
    req.flush(msg, { status: 401, statusText: 'Unauthorized app_id' });
  });
});
