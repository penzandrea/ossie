import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AspectsComponent} from "../aspects/aspects.component";
import {BearsComponent} from "../bears/bears.component";
import {BearDetailComponent} from "../bear-detail/bear-detail.component";
import {BearCreateComponentComponent} from "../bear-create-component/bear-create-component.component";
import {BearFormComponent} from "../bear-form/bear-form.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {LoginComponent} from "../login.component";
import {FactorsComponent} from "../factors/factors.component";
import {ProjectsComponent} from "../projects/projects.component";
import {ProjectDetailComponent} from "../project-detail/project-detail.component";
import {ProjectDetailIssuesPipeComponent} from "../project-detail-issues-pipe/project-detail-issues-pipe.component"
import {AspectDrilldownLevel0Component} from "../aspect-drilldown-level-0/aspect-drilldown-level-0.component";
import {AspectDrilldownLevel1Component} from "../aspect-drilldown-level-1/aspect-drilldown-level-1.component";
import {ProjectDetailFilterIssuesComponent} from "../project-detail-filter-issues/project-detail-filter-issues.component";
import {ProjectDetailFilterIssuesComponent0} from "../project-detail-filter-issues-0/project-detail-filter-issues-0.component";
import {ProjectDetailFilterIssuesComponent1} from "../project-detail-filter-issues-1/project-detail-filter-issues-1.component";


// Define the routes
const ROUTES = [
  {
    path: 'bears',
    component: BearsComponent
  },
  {
    path: 'all-aspects',
    component: AspectsComponent
  },
  {
    path: 'all-factors',
    component: FactorsComponent
  },
  {
    path: 'all-projects',
    component: ProjectsComponent
  },
  { path: 'aspect-drilldown-0', component: AspectDrilldownLevel0Component },
  { path: 'aspect-drilldown-1', component: AspectDrilldownLevel1Component },


  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'project-pipe/:id', component: ProjectDetailIssuesPipeComponent },
  { path: 'project-detail-filter-issues/:id', component: ProjectDetailFilterIssuesComponent },
  { path: 'project-detail-filter-issues-0/:id', component: ProjectDetailFilterIssuesComponent0},
  { path: 'project-detail-filter-issues-1/:id', component: ProjectDetailFilterIssuesComponent1},



  //{ path: 'bear/:_id', component: BearDetailComponent },

  { path: 'bear/:_id', component: BearDetailComponent },
  { path: 'bear', component: BearCreateComponentComponent },
  { path: 'bearform/:_id', component: BearFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'bears', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      //{ enableTracing: true }  <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
 
})
export class RoutingModule { }
