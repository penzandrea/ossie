import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-issues-gouped-by-components',
  templateUrl: './issues-gouped-by-components.component.html',
  styleUrls: ['./issues-gouped-by-components.component.css']
})
export class IssuesGoupedByComponentsComponent  {
  issues: Issue[];
  groupedResults: Object;

  constructor(

      private issuesService: IssuesService,
      private route: ActivatedRoute,


  ) {
    this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.issuesService.getIssuesGroupedByFeature(Number(params.get('id')),"rule"))
        .subscribe(
            issues => this.groupedResults = issues
        );
  }

}
