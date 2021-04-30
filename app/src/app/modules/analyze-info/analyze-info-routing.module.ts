import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AnalysisResultComponent } from './components/analysis-result/analysis-result.component'
import { DataCollectionComponent } from './components/data-collection/data-collection.component'

const routes: Routes = [
  {
    path: '',
    component: DataCollectionComponent
  },
  {
    path: 'result',
    component: AnalysisResultComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeInfoRoutingModule {}
