import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-issues-gouped-by-severity',
  templateUrl: './issues-gouped-by-severity.component.html',
  styleUrls: ['./issues-gouped-by-severity.component.css']
})
export class IssuesGoupedBySeverityComponent {

  issues: Issue[];
  groupedResults: Object;

  constructor(

      private issuesService: IssuesService,
      private route: ActivatedRoute,


  ) {
    this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.issuesService.getIssuesGroupedByFeature(Number(params.get('id')),"severity"))
        .subscribe(
            issues => this.groupedResults = issues
        );
  }

}
