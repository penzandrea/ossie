/*
 import 'rxjs/add/operator/switchMap';

 import { Component, OnInit } from '@angular/core';
 import { FormControl }            from '@angular/forms';
 */
import {Location} from "@angular/common";
import "rxjs/add/operator/map";
import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Project} from "../model/project";
import {ProjectsService} from "../projects.service";
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

//  export class ProjectDetailComponent {

/*
  project: Project;
  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private location: Location) { }


*/

@Input() project: Project;

  projectForm: FormGroup;
  rulesShown: boolean;
  severityShown: boolean;
  componentsShown: boolean;
  hallo: boolean;

  //states = states;
  issues: Issue[];
  errorMessage: string;
  groupedResults: Array<Object>;
  groupByIndex = 2;





  constructor(private fb: FormBuilder,
      private projectsService: ProjectsService,
      private issuesService: IssuesService,
      private route: ActivatedRoute,
      private location: Location,
      private router: Router
  ) {
      this.createForm();
      //this.project = this.route.params.switchMap((params: Params) => this.projectsService.getProject(+params['id'])).map(res => res.json());
    }

  ngOnInit():void {
    this.setup();
   }
  
  createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required ],
      //address: this.fb.group(new Address()), // <-- a FormGroup with a new address
      id: '',
      sonarkey: ''
    });
  }

  showRules() {
    console.log('Show Issues');
    this.rulesShown = !this.rulesShown;
    //this.getIssues();

  }
  showSeverity() {
    this.severityShown = !this.severityShown;
    //this.getIssues();
  }
  showComponents() {
    this.componentsShown = !this.componentsShown;
    this.hallo = !this.hallo;
    console.log('show');
    console.log(this.componentsShown);

  }
  getIssues() {
    // Retrieve posts from the API

    this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.issuesService.getIssues(Number(params.get('id'))))
        .subscribe(
            issues => this.issues = issues
        );
   // this.groupedResults = this.groupArrayBy(this.issues, this.groupByIndex);


    // this.issuesService.getAllIssues()
   //      .subscribe(
   //          issues => this.issues = issues,
   //          error => this.errorMessage = <any>error);

/*     this.projectService.getBear().subscribe(
     users => console.log('users', users),
     error => console.error('error', error));*/

    // transform results into grouped results
    // you can easily extract this into a function and just pass your results in and the array index you want to group on

  }

  /** Transforms an array of arrays into an array of grouped objects
   *
   * @param {Array} list - The array of arrays to tranform into groups.
   * @param {int} groupByIndex - The index of the element to group on.
   */
  groupArrayBy(list, groupByIndex) {
    // create a map to hold groups with their corresponding results
    const map = new Map();
    list.forEach((item) => {
      const key = item[groupByIndex];
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });

    // convert map back to a simple array of objects
    let groups: Array<Object> = Array.from(map, x => this.addGroup(x[0], x[1]) );

    // output groups to the console for demostration
    console.log("map = ", map);
    console.log("groups = ", groups);

    return groups;
  }
  addGroup(key, value) {
    return { "key": key, "value": value };
  }

  onSubmit() {
    this.project = this.prepareSaveProject();
    this.projectsService.updateProject(this.project.id, this.project.name, this.project.sonarkey).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveProject(): Project {
  const formModel = this.projectForm.value;

  // deep copy of form model lairs
  //const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
  //  (address: Address) => Object.assign({}, address)
  //);

  // return new `Hero` object containing a combination of original hero value(s)
  // and deep copies of changed form model values
  const saveProject: Project = {
    id: this.project.id,
    name: formModel.name as string,
    sonarkey: formModel.sonarkey as string,
     //img: formModel.sonarkey as string,

    // addresses: formModel.secretLairs // <-- bad!
    //addresses: secretLairsDeepCopy
  };
  return saveProject;
  }
  ngOnChanges() {
    this.projectForm.reset({
      id: this.project.id,
      name: this.project.name,
      sonarkey: this.project.sonarkey,
      //address: this.hero.addresses[0] || new Address()
    });
  }

  goBack(): void {
    this.location.back();
    let projectId = this.project ? this.project.id : null;

    this.router.navigate(['/projects', { id: projectId, foo: 'foo' }]);
    }

  setup(){
      console.log('setup');
      this.rulesShown = false;
    this.severityShown = false;
    this.componentsShown = false;
    this.hallo = false;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.projectsService.getProject(Number(params.get('id'))))
      .subscribe(
        project => { 
          this.project = project;
          this.projectForm.setValue({id: this.project.id, name: this.project.name, sonarkey: this.project.sonarkey });
         }
      );
      /*
      this.route.queryParamMap.subscribe((params)=> {
        //check lead Id here
        if(typeof params['id'] === 'undefined'){
          console.log('keine params');
        } else {
          console.log('id  found in params')
          console.log(params['id']);
        }
      });
      console.log('neuer test');

      var test = this.route.queryParamMap.map(params => params.has('id')).subscribe(
        project => { 
          this.project = project;
          this.projectForm.setValue({id: this.project.id, name: this.project.name, sonarkey: this.project.sonarkey });
         }
      );
      console.log(this.route.queryParamMap.map(params => params.has('id')));
      console.log(test);
*/
      /* let projectId = this.route.snapshot.params['id'];
          this.projectsService.getProject(projectId).subscribe(project => {
            this.project = project;
            this.projectForm.setValue({
                id: this.project.id,
                name:    this.project.name,
                sonarkey: this.project.sonarkey,
            });
          });
      */
  }
}
