import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../issues.service";
import {Issue} from "../model/issue";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatExpansionModule} from '@angular/material';


@Component({
  selector: 'app-issues-gouped-by-rules',
  templateUrl: './issues-gouped-by-rules.component.html',
  styleUrls: ['./issues-gouped-by-rules.component.css']
})
export class IssuesGoupedByRulesComponent implements OnInit {

  issues: Issue[];
  groupedResults: Object;
  groupByIndex = 2;

  constructor(

              private issuesService: IssuesService,
              private route: ActivatedRoute,


  ) {
    this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.issuesService.getIssuesGroupedByRule(Number(params.get('id'))))
        .subscribe(
            issues => this.groupedResults = issues
        );
  }
  ngOnInit() {

  }
  /*ngAfterContentInit(){
    this.groupedResults = this.groupArrayBy(this.issues, this.groupByIndex);

  }*/

  /** Transforms an array of arrays into an array of grouped objects
   *
   * @param {Array} list - The array of arrays to tranform into groups.
   * @param {int} groupByIndex - The index of the element to group on.
   */
  /*groupArrayBy(list, groupByIndex) {
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
  }*/
}
