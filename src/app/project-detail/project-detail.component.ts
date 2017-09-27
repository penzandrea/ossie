/*
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { FormControl }            from '@angular/forms';
*/
import { Location }               from '@angular/common';

import 'rxjs/add/operator/map';
import { Component, Input, OnChanges, OnInit }             from '@angular/core';
import { FormBuilder, FormGroup, Validators }      from '@angular/forms';
import { ActivatedRoute, Params, ParamMap, Router } from '@angular/router';


import { Project }         from '../model/project';
import { ProjectsService }  from '../projects.service';

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
  //states = states;

  
  constructor(private fb: FormBuilder,
      private projectsService: ProjectsService,
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

  showIssues() {
    console.log('Show Issues');
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
    //this.location.back();
    let projectId = this.project ? this.project.id : null;

    this.router.navigate(['/projects', { id: projectId, foo: 'foo' }]);
    }

  setup(){
console.log('setup');
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
