import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from '../projects.service';
import { Project } from '../model/project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    // instantiate posts to an empty array
    projects: Project[];
    selectedProject: Project;
    errorMessage: string;

    constructor(private projectService: ProjectsService, private router: Router) {
    }


    ngOnInit() {
        this.getProjects();
        console.log('refresh');
    }

    newBear() {
        this.router.navigate(['/bear']);
    }

    getProjects() {
        // Retrieve posts from the API
        this.projectService.getAllProjects()
            .subscribe(
                aspects => this.projects = aspects,
                error => this.errorMessage = <any>error);
        /*
         this.projectService.getBear().subscribe(
         users => console.log('users', users),
         error => console.error('error', error));
         */
    }


    onSelect(editProject: Project): void {
        this.selectedProject = editProject;
        console.log('click');

        this.router.navigate(['/project', this.selectedProject.id]);
        //bearchy => console.log('bearchy', bearchy);
        console.log('click');
        //console.log(bearchy);

    }


    edit(bearchy: Project) {


        this.selectedProject = bearchy;
        console.log('clickkk');

        this.router.navigate(['/bear', this.selectedProject.id]);
        //bearchy => console.log('bearchy', bearchy);
        //console.log('click');
        //console.log(bearchy);
    }

    /*
     addBear(_id: number, name: string, age: number, img: string) {
     if (!name || !_id || !age) { return; }
     this.projectService.create(_id, name, age, img)
     .subscribe(
     hero  => this.aspects.push(hero));
     this.selectedBear = null;

     }
     */
}

