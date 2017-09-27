import { NgModule } from '@angular/core';

import { RouterModule, Routes }  from '@angular/router';
import { AspectsComponent } from '../aspects/aspects.component';

import { BearsComponent } from '../bears/bears.component';
import { BearDetailComponent } from '../bear-detail/bear-detail.component';
import { BearCreateComponentComponent } from '../bear-create-component/bear-create-component.component';

import { BearFormComponent } from '../bear-form/bear-form.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import {LoginComponent} from '../login.component';

import { CommonModule } from '@angular/common';
import {FactorsComponent} from "../factors/factors.component";
import {ProjectsComponent} from "../projects/projects.component";
import {ProjectDetailComponent} from "../project-detail/project-detail.component";


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
  { path: 'project/:id', component: ProjectDetailComponent },

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
