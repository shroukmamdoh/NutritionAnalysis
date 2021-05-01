import { AnalysisResultComponent } from '../analyze-info/components/analysis-result/analysis-result.component';
import { DataCollectionComponent } from '../analyze-info/components/data-collection/data-collection.component';

export const TEST_ROUTE: any = [
  {
    path: 'home',
    children: [
      {
        path: '',
        component: DataCollectionComponent,
      },
      {
        path: 'result',
        component: AnalysisResultComponent,
      },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
