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
  children: any;
  allAspects: Aspect[];
  tree: Aspect[];
  asp: Aspect;

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

              // If you want to assign tasks to each process after all calls are finished:
              children.forEach((child, i) => {
                this.allAspects[i].children = Aspect.fromJSONArray(children[i]);
              });
              console.log("EEEEEEEEEEEEEEEEEEE");
              this.asp = new Aspect (3, "", "", null);
              this.tree = Aspect.aspectFromId(this.allAspects, 411);
              console.log("FFFFFFFFFFFFFFFFFFF");
              console.log(this.tree);
              console.log("FFFFFFFFFFFFFFFFFFF");


            }
          );


        }
  );


  }

  ngOnInit() {

  }

}
