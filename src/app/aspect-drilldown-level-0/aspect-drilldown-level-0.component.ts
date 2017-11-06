import { Component, OnInit } from '@angular/core';
import {AspectsService} from "../aspects.service";
import {Aspect} from "../model/aspect";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-aspect-drilldown-level-0',
  templateUrl: './aspect-drilldown-level-0.component.html',
  styleUrls: ['./aspect-drilldown-level-0.component.css']
})
export class AspectDrilldownLevel0Component implements OnInit {
  aspects: Aspect[];
  aspectFirstHierarchy:Aspect[];
  //aspectFirstHierarchy:Aspect[] = [new Aspect(1111, "", "", null)];
  children: Aspect[];
  allAspects: Aspect[];
  //childrenArray: Aspect[];


  groupedResults: Object;
  errorMessage: string;

  constructor(
      private aspectsService: AspectsService,
      private route: ActivatedRoute,
  ) {
    this.aspectsService.getFirstLevelAspects()
        .subscribe(
            aspects => this.aspectFirstHierarchy = aspects,
            error => this.errorMessage = <any>error);

    // Get the risk from the server
    this.aspectsService.getAllAspectsFromServer();
    // subscribe to subject
    this.aspectsService.aspectsSubject.subscribe(
        allAspects => {
          this.allAspects = allAspects;
          aspectsService.getChildrenForEachAspect(allAspects).subscribe(
            children => {
              this.children = children;
              console.log(children); // [[Task], [Task], [Task]];

              // In case error occurred e.g. for the process at position 1,
              // Output will be: [[Task], null, [Task]];
              //console.log(this.aspectFirstHierarchy);
              for (let key in this.allAspects) {
                //let tudldu = [ new Aspect("1111", "test", "test", null) ];
                this.allAspects[key].children = null;
              }
              console.log("++++++++");
              console.log(this.allAspects);
              console.log("++++++++");

              console.log("CCCCCCCCCCCHHHHHIIIILLLLDDDDRRREEENNN");

              children.forEach((child, h) => console.log(children[h]));

              console.log("AAAAAALLLLLLlAAAASSSSPPPEEECCCTTTSSS");
              this.allAspects.forEach((aspect, i) => console.log(this.allAspects[i]));

              // If you want to assign tasks to each process after all calls are finished:
              children.forEach((children, i) => {
                var d = new Aspect(1,"","",null);
                d.copyInto(children[i]);
                this.allAspects[i].children = children[i];
              })

              console.log("FINIIIIIISH");
              console.log(this.allAspects);


            }
        );
        });






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
    console.log("INIT");

    console.log(this.allAspects);

  }

}
