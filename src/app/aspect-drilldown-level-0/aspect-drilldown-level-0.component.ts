import { Component, OnInit } from '@angular/core';
import {AspectsService} from "../aspects.service";
import {Aspect} from "../model/aspect";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-aspect-drilldown-level-0',
  templateUrl: './aspect-drilldown-level-0.component.html',
  styleUrls: ['./aspect-drilldown-level-0.component.css']
})
export class AspectDrilldownLevel0Component implements OnInit {
  aspects: Aspect[];
  aspectFirstHierarchy:Aspect[] = [new Aspect(1111, "", "", null)];
  firstLevelAspects: Aspect[];
  //childrenArray: Aspect[];


  groupedResults: Object;
  errorMessage: string;

  constructor(
      private aspectsService: AspectsService,
      private route: ActivatedRoute,
  ) {
    this.aspectsService.getFirstLevelAspects()
        .subscribe(
            aspects => this.firstLevelAspects = aspects,
            error => this.errorMessage = <any>error);

    // Get the risk from the server
    this.aspectsService.getAllAspectsFromServer();
    // subscribe to subject
    this.aspectsService.aspectsSubject.subscribe(
        data => { aspectsService.getChildrenForEachProcess(data).subscribe(
            childrenArray => {
              console.log(childrenArray); // [[Task], [Task], [Task]];
              // In case error occurred e.g. for the process at position 1,
              // Output will be: [[Task], null, [Task]];
              console.log(this.aspectFirstHierarchy);
              // If you want to assign tasks to each process after all calls are finished:
              childrenArray.forEach((tasks, i) => this.aspectFirstHierarchy[i].children = childrenArray[i]);
            }
        );
        });

    console.log(this.aspectsService.allAspects);

    console.log("------------------------------------------------------------");
    console.log(this.aspectFirstHierarchy);




    /*        this.aspectsService.getChildrenForEachProcess().subscribe(
                tasksArray => {
                  console.log(tasksArray); // [[Task], [Task], [Task]];
                  // In case error occurred e.g. for the process at position 1,
                  // Output will be: [[Task], null, [Task]];

                  // If you want to assign tasks to each process after all calls are finished:
                  tasksArray.forEach((tasks, i) => this.processes[i].tasks = tasksArray[i]);
                }
            );*/

  }

  ngOnInit() {
  }

}
