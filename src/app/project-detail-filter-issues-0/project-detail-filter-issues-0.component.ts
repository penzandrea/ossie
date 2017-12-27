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
import {ProjectsService} from "../projects.service";
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";


@Component({
    selector: 'app-project-detail-filter-issues-0',
    templateUrl: './project-detail-filter-issues-0.component.html',
    styleUrls: ['./project-detail-filter-issues-0.component.css']
})
export class ProjectDetailFilterIssuesComponent0 implements OnInit {

    filter: Issue = new Issue();
    filterSeverityS: string;
    filterComponentS: string;
    filterRuleS: string;

    rulesShown: boolean;
    severityShown: boolean;
    componentsShown: boolean;
    issues: Issue[];
    errorMessage: string;
    groupedResults: Array<Object>;
    numberOfIssues: number;
    limit: number;
    page: number = 1;


    constructor(private projectsService: ProjectsService,
                private issuesService: IssuesService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}


    ngOnInit(): void {
        this.setup();
    }


    showRules() {
        console.log('Show Issues');
        this.rulesShown = !this.rulesShown;
        //this.getIssues();

    }

    showSeverity() {
        this.severityShown = !this.severityShown;
        //this.getIssues();
        //bla
    }

    showComponents() {
        this.componentsShown = !this.componentsShown;
        console.log('show');
        console.log(this.componentsShown);

    }
    filterSeverity(id: string): void {
        this.filter.severity = id;

        console.log(id);
    }
    filterComponent(id: string): void {
        this.filter.component = id;

        console.log(id);
    }
    filterRule(id: string): void {
        this.filter.rule = id;
        console.log(id);
    }
    noneSelected() {
        return false;
    }
    setup() {
        console.log('setup');
        this.rulesShown = false;
        this.severityShown = false;
        this.componentsShown = false;
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.issuesService.getIssues(Number(params.get('id'))))
            .subscribe(
                issues => {
                    this.groupedResults = issues;
                    this.numberOfIssues = this.groupedResults.length;
                    this.limit = this.groupedResults.length;
                }
            );

    }
}
