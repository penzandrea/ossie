/*
 import 'rxjs/add/operator/switchMap';

 import { Component, OnInit } from '@angular/core';
 import { FormControl }            from '@angular/forms';
 */
import {Location} from "@angular/common";
import "rxjs/add/operator/map";
import {Component, Input, OnChanges, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProjectsService} from "../projects.service";
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
    selector: 'app-project-detail-filter-issues-2',
    templateUrl: './project-detail-filter-issues-2.component.html',
    styleUrls: ['./project-detail-filter-issues-2.component.css'],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailFilterIssuesComponent2 implements OnInit {

    filter: Issue = new Issue();
    filterSeverity: Array<string> = [];
    filterComponent: Array<string> = [];
    filterRule: Array<string> = [];

    issues: Issue[];
    errorMessage: string;
    groupedResults: Array<Object>;
    numberOfIssues: number;
    limit: number;
    page: number = 1;
    wasClicked = false;



    constructor(private projectsService: ProjectsService,
                private issuesService: IssuesService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}


    ngOnInit(): void {
        this.setup();
    }

    isActiveFilter(parameter, filtertype){

    }
    isActive(item, filtertype: string) {
//    isActive(item, factor: string, filterArray: Array<string>) {

        let filterarray: Array<string>;

        switch (filtertype){
            case "severity":
                filterarray = this.filterSeverity;
                break;

            case "component":
                filterarray = this.filterComponent;
                break;

            case "rule":
                filterarray = this.filterRule;
                break;

            default:
                break
        }

        for (let filterItem of filterarray) {
            //console.log(filterItem); // 1, "string", false
            //console.log(item); // 1, "string", false

            if (filterItem == item[filtertype]){
                //console.log("true");
                return true;
            }
        }
        return false;
    };


    applyFilter(issue: Issue, filtertype: string): void {

        // IN ORDER TO ENABLE PURE PIPE RENEW LIST-REFERENCE:
        let issuesTmp = this.groupedResults;

        this.groupedResults = new Array<string>();
        for (var i = 0; i < issuesTmp.length; i++){
            this.groupedResults.push(issuesTmp[i]);
        }

        let filterarray: Array<string>;
        switch (filtertype){
            case "severity":
                filterarray = this.filterSeverity;
                break;

            case "component":
                filterarray = this.filterComponent;
                break;

            case "rule":
                filterarray = this.filterRule;
                break;

            default:
                break
        }
        const index: number = filterarray.indexOf(issue[filtertype]);
        console.log("index:" + index);

        // deselect option
        // delete value from filter if it has already been in it
        if (index !== -1) {
            filterarray.splice(index, 1);
        }
        else {
            filterarray.push(issue[filtertype]);
        }
        console.log(issue[filtertype]);
        console.log(filterarray);
        console.log("----------------");
    }

    setup() {
        console.log('setup');

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
