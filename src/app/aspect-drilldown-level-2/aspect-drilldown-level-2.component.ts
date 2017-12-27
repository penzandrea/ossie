import { Component, OnInit } from '@angular/core';
import {AspectsService} from "../aspects.service";
import {Aspect} from "../model/aspect";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeNode } from 'angular-tree-component';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

let id = 10;

@Component({
  selector: 'app-aspect-drilldown-level-2',
  templateUrl: './aspect-drilldown-level-2.component.html',
  //styleUrls: ['../../../node_modules/angular-tree-component/dist/angular-tree-component.css']
  styles: [
    '.root1Class { color: blue }',
    '.root2Class { color: red }'
  ]
})
export class AspectDrilldownLevel1Component implements OnInit {
  errorMessage: string;
  serverNodes: Aspect[];
  children: any;
  jsonNodes: any;

  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this)
  };

  nodes= [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];

  bla = [
    {
      "id":411,
      "name":"Design Principles",
      "description":"",
      "children":[
        {
          "id":399,
          "name":"ABS",
          "description":"Covers all design principles that are closely related with abstraction topics.",
          "children":[
            {
              "id":405,
              "name":"SRP",
              "description":"A class should have only one scope of responsibility (determined by the incoming references) and thus there should be only one reason for changes. \n\nThis princple is about cohesion on the class level. Responsibility in this context is defined as \"a reason for change\". If there is more than one motive for changing a class, then that class has more than one responsibility. "
            }
          ]
        },
        {
          "id":407,
          "name":"ENC",
          "description":"",
          "children":[
            {
              "id":410,
              "name":"IHI",
              "description":"Information Hiding is the ability to prevent certain parts (implementation) of a class or component from being accessible to clients.\n\nThe basic idea is that if code chunk A doesn't really need to know something about how code chunk B (which it calls) does its job, don't make it know it. Then, when that part of B changes, you don't have to go back and change A.\n\nEncapsulation can have a different meaning, too: it means collecting a bunch of stuff together and putting it in one box, or capsule. The box may or may not have opaque walls, so this may or may not involve information hiding. In practice a \"class\" will both encapsulate (i.e., bundle code and data together) and hide information (namely, implementation detail), and some people get so used to doing both at once they no longer bother to distinguish. "
            }
          ]
        },
        {
          "id":416,
          "name":"MOD",
          "description":"Covers all design principles that are closely related with modularity topics. Modularity is based on a few fundamental concepts: \n\n(1) Self-Contained: A module is a self-contained component of a larger software system. This doesn't mean that it is an atomic component. In fact a module consists a several smaller pieces which are collectively contributed to the functionality/performance of the module.\n(2) Highly Cohesive: Cohesiveness means that a component (module) is strongly related or focused to carry out a specific task and also not doing any unrelated tasks.\n(3) Loose Coupling: A given module's internal implementation is not dependent on the other module that it interacts with. Modules are interacting with a well defined clean interface and any of module can change its internal implementation without affecting other modules."
        }
      ]
    }
  ];

  constructor(
      private aspectsService: AspectsService,

  ) {

    let serverNodes;

    this.aspectsService.getAllAspectsFromServer();
    this.aspectsService.aspectsSubject.subscribe(
        nodes => {
          this.serverNodes = nodes;
          this.aspectsService.getChildrenForEachAspect(nodes).subscribe(
              children => {
                this.children = children;

                // If you want to assign tasks to each process after all calls are finished:
                children.forEach((child, i) => {
                  this.serverNodes[i].children = Aspect.fromJSONArray(children[i]);
                });
                let asp = new Aspect (3, "", "", null);
                let tmpjson = JSON.stringify(Aspect.generateTree(this.serverNodes, 411));
                this.nodes = JSON.parse(tmpjson);


                console.log("FFFFFFFFFFFFFFFFFFF");

              }
          );


        }
    );

/*    this.nodes = [
      {
        name: 'root1',
        children: [
          { name: 'child1' }
        ]
      },
      {
        "name":"Design Principles",
        "id":411,
        "description":"",
        hasChildren: true
      },
      {
        name: 'root3'
      }
    ];*/

  }




  addNodes() {
    this.nodes[1].children.push({
      id: ++id,
      name: `node ${id}`
    });
    this.nodes = [...this.nodes];
  }

  getTree(node: any) {
    // subscribe to subject
    // Get the risk from the server
    let serverNodes;

    this.aspectsService.getAllAspectsFromServer();
    this.aspectsService.aspectsSubject.subscribe(
        nodes => {
          this.serverNodes = nodes;
          this.aspectsService.getChildrenForEachAspect(nodes).subscribe(
              children => {
                this.children = children;

                // If you want to assign tasks to each process after all calls are finished:
                children.forEach((child, i) => {
                  this.serverNodes[i].children = Aspect.fromJSONArray(children[i]);
                });
                //console.log("EEEEEEEEEEEEEEEEEEE");
                let asp = new Aspect (3, "", "", null);
                this.jsonNodes = JSON.stringify(Aspect.generateTree(this.serverNodes, 411));
                console.log("FFFFFFFFFFFFFFFFFFF");
                console.log(this.jsonNodes);
                //console.log(JSON.stringify(this.jsonNodes));
                //console.log("FFFFFFFFFFFFFFFFFFFF");

              }
          );


        }
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.jsonNodes), 1000);
    });
  }
  getChildren(node: any) {
    /*    const newNodes = this.bla.map(
     (c) => Object.assign({}, c) //Klonen eines Objekts

     );*/
    let aspectFirstHierarchy;
    this.aspectsService.getFirstLevelAspectsBaseNode(node.data.id)
        .subscribe(
            aspects => aspectFirstHierarchy = aspects,
            error => this.errorMessage = <any>error);

    const newNodes = this.bla.map(
        (c) => Object.assign({}, c) //Klonen eines Objekts

    );
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(aspectFirstHierarchy), 1000);
    });
  }

  ngOnInit() {
  }

}
