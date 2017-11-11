import { Component, OnInit } from '@angular/core';
import {AspectsService} from "../aspects.service";
import {Aspect} from "../model/aspect";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeNode } from 'angular-tree-component';
import {Http, Response, RequestOptions, Headers} from '@angular/http';


@Component({
  selector: 'app-aspect-drilldown-level-0',
  templateUrl: './aspect-drilldown-level-0.component.html',
  //styleUrls: ['../../../node_modules/angular-tree-component/dist/angular-tree-component.css']
    styles: [
        '.root1Class { color: blue }',
        '.root2Class { color: red }'
    ]
})
export class AspectDrilldownLevel0Component implements OnInit {
  aspects: Aspect[];
  aspectFirstHierarchy:Aspect[];
  //aspectFirstHierarchy:Aspect[] = [new Aspect(1111, "", "", null)];
  children: any;
  serverNodes: Aspect[];
  //nodes: Aspect[];
    jsonNodes: any;
  asp: Aspect;

  //childrenArray: Aspect[];


   nodes = [
       {
           "id":411,
           "name":"Design Principles",
           "description":""
           ,"children":[
               {"id":399,"name":"ABS","description":"Covers all design principles that are closely related with abstraction topics.","children":[{"id":405,"name":"SRP","description":"A class should have only one scope of responsibility (determined by the incoming references) and thus there should be only one reason for changes. \n\nThis princple is about cohesion on the class level. Responsibility in this context is defined as \"a reason for change\". If there is more than one motive for changing a class, then that class has more than one responsibility. "},{"id":406,"name":"CCS","description":"A method shall not do both, modifying an object (command) and retrieving information about an object (query). There shall always be different methods for these two types of access."},{"id":408,"name":"ISE","description":"The principle emphasizes that interfaces have to used solely (see also principle 'Program to an interface, not an implementation'). Nevertheless, the principle goes one step further. It additionally enforces complete separation of interface and implementation; thus a client (just as an example) must not even instantiate an implementing class!\n\nMany dynamic component models like OSGi separate abstract types and implementation types. This separation facilitates service-oriented programming where service implementation providers are dynamically associated with service consumers through dependency injection techniques. In particular, this enables the dynamic swapping of service providers with minimal impact on the service consumers. This approach is common in OSGi based applications like Eclipse (extension points (interface) and extensions (concrete implementation). Other OSGi extensions such as Declarative Services and Spring Dynamic Modules use similar mechanisms.\n\nTo take advantage of these platforms, interfaces and implementations need to be separated, and the dependencies between them must be minimized. In fact, the Interface Separability Principle measures how easily this can be done."}]},{"id":407,"name":"ENC","description":"","children":[{"id":410,"name":"IHI","description":"Information Hiding is the ability to prevent certain parts (implementation) of a class or component from being accessible to clients.\n\nThe basic idea is that if code chunk A doesn't really need to know something about how code chunk B (which it calls) does its job, don't make it know it. Then, when that part of B changes, you don't have to go back and change A.\n\nEncapsulation can have a different meaning, too: it means collecting a bunch of stuff together and putting it in one box, or capsule. The box may or may not have opaque walls, so this may or may not involve information hiding. In practice a \"class\" will both encapsulate (i.e., bundle code and data together) and hide information (namely, implementation detail), and some people get so used to doing both at once they no longer bother to distinguish. "}]},{"id":414,"name":"CCC","description":"","children":[{"id":409,"name":"DRY","description":"Every piece of knowledge must have a single, unambiguous, and authoritative representation within a software system. \n\nThe author references to this principle as the DRY-principle and claims that it is not only represented in code, but plays a more general important role, e.g., also in documentation. The author distinguishes between imposed and inadvertent duplication:\n\n*  Imposed Duplication\n        ** Multiple representations of information: This is about duplicated data structures caused by external forces, like different programming languages. This type of problem cannot be covered by us.\n        ** Documentation in code: Lower level documentation is kept directly in the code - higher level documentation should be minimal in order to avoid duplicates. We could claim here that packages, classes and public methods should be well documented; on the other hand inline-comments in methods or functions should be minimal.\n        ** Documentation and code: Documentation should fit with the code. Parts of this can be checked by assuring that references to web pages, references to other parts of the code, references to argument names, exceptions, type of return values, etc. are correct. \n*  Inadvertent Duplication\n        ** This topic deals with unnecessary caches, i.e., values that can be computed from other (instance) variables. This needs semantic understanding and can hardly be checked. \n*  Impatient Duplication and Interdeveloper Duplication\n        ** This is about classical duplication topics, i.e., duplicated internal code, code reused and changed from external libraries (difficult to detect). "}]},{"id":415,"name":"HIE","description":"","children":[{"id":417,"name":"FCOI","description":"In doubt, use composition for reuse of functionality (blackbox reuse) instead of inheritance (whitebox reuse). Composition is more flexible than inheritance and inheritance can break encapsulation. Basically, using composition or inheritance depends on the particular use case. "}]},{"id":416,"name":"MOD","description":"Covers all design principles that are closely related with modularity topics. Modularity is based on a few fundamental concepts: \n\n(1) Self-Contained: A module is a self-contained component of a larger software system. This doesn't mean that it is an atomic component. In fact a module consists a several smaller pieces which are collectively contributed to the functionality/performance of the module.\n(2) Highly Cohesive: Cohesiveness means that a component (module) is strongly related or focused to carry out a specific task and also not doing any unrelated tasks.\n(3) Loose Coupling: A given module's internal implementation is not dependent on the other module that it interacts with. Modules are interacting with a well defined clean interface and any of module can change its internal implementation without affecting other modules.","children":[{"id":400,"name":"PINI","description":"Interfaces should be used as far as possible instead of concrete classes. "},{"id":401,"name":"SOC","description":"A software system shall be separated into distinctive components that overlap in functionality as little as possible."},{"id":402,"name":"CCP","description":"The classes in a package should be closed together against the same kinds of changes. A change that affects a package affects all the classes in that package. Classes which cannot be closed against certain types of changes should be grouped together into the same packages. Thus, when a change in requirements comes along; that change has a good chance of being restricted to a minimal number of packages.\n"},{"id":403,"name":"ISP","description":"The dependency of one class to another one should depend on the smallest possible interface.\n\nThe principle is to be checked on the class level. The basic idea is to find out which methods of a class are always used together. If such groups can be identified then the class is a candidate for being split.\n"},{"id":404,"name":"SDOP","description":"A component should include all technical documentation about itself. \n\nThe principle emphasizes the terms component and all technical documentation. The principle deals with internal documentation only, not with user documentation. To clarify here an excerpt of the explanation of the principle.\n\n* The principle is important to keep documentation \"in sync\".\n* The documentation of a module (the term is used quite general here) should be included in the module itself\n*  Assertions, i.e., design by contract is also part of the documentation - as Meyer means it. "},{"id":412,"name":"OCP","description":"Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.\n\nA software entity is said to be open if it is still available for extension. For example, it should be possible to expand its set of operations or add fields to its data structures.\nA software entity is said to be closed if it is available for use by other entities. This assumes that the software entity has been given a well-defined, stable description (its interface in the sense of information hiding). At the implementation level, closure for a entity also implies that you may compile it, perhaps store it in a library, and make it available for others (its clients) to use. In the case of a design or specification entity, closing a module simply means having it approved by management, adding it to the project’s official repository of accepted software items (often called the project baseline), and publishing its interface for the benefit of other entity authors."},{"id":413,"name":"ADP","description":"The dependency structure between packages must be a directed acyclic graph (DAG). That is, there must be no cycles in the dependency structure."}]}]}];





    nodes1 = [
        {
            title: 'root1',
            className: 'root1Class'
        },
        {
            title: 'root2',
            className: 'root2Class',
            hasChildren: true
        }
    ];

    nodes2 = [
        {
            title: 'root1',
            className: 'root1Class'
        },
        {
            title: 'root2',
            className: 'root2Class',
            children: [
                { title: 'child1', className: 'child1Class' }
            ]
        }
    ];
    options1: ITreeOptions = {
        getChildren: (node:TreeNode) => new Promise((resolve, reject) => {

            let aspectsChildrenUrl =  'http://localhost:4200/aspects' + node.data.id + '/children';
            console.log('aspectsChildrenUrl ' + aspectsChildrenUrl);
            //let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
            this.http.get(aspectsChildrenUrl)
                .toPromise()
                .then(
                    res => { // Success
                        console.log(res.json());
                        resolve();
                    },
                    msg => { // Error
                        reject(msg);
                    }
                );
        })
    };

    options0: ITreeOptions = {
        displayField: 'title',
        nodeClass: (node) => `${node.data.title}Class`
    };
/*
    options: ITreeOptions = {
        displayField: 'child1',
        isExpandedField: 'expanded',
        idField: 'uuid',
        actionMapping: {
            mouse: {
                dblClick: (tree, node, $event) => {
                    if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
                }
            }
        },
        nodeHeight: 23,
        allowDrag: (node) => {
            return true;
        },
        allowDrop: (node) => {
            return true;
        },
        useVirtualScroll: true,
        animateExpand: true,
        animateSpeed: 30,
        animateAcceleration: 1.2
    }
*/

  groupedResults: Object;
  errorMessage: string;

  constructor(
      private aspectsService: AspectsService,
      private route: ActivatedRoute,
      private http: Http
  ) {
      
    this.aspectsService.getFirstLevelAspects()
        .subscribe(
            aspects => this.aspectFirstHierarchy = aspects,
            error => this.errorMessage = <any>error);

    // Get the risk from the server
    this.aspectsService.getAllAspectsFromServer();

    // subscribe to subject
    this.aspectsService.aspectsSubject.subscribe(
        nodes => {
          this.serverNodes = nodes;
          aspectsService.getChildrenForEachAspect(nodes).subscribe(
            children => {
              this.children = children;

              // If you want to assign tasks to each process after all calls are finished:
              children.forEach((child, i) => {
                this.serverNodes[i].children = Aspect.fromJSONArray(children[i]);
              });
              //console.log("EEEEEEEEEEEEEEEEEEE");
              this.asp = new Aspect (3, "", "", null);
              this.jsonNodes = JSON.stringify(Aspect.aspectFromId(this.serverNodes, 411));
              console.log("FFFFFFFFFFFFFFFFFFF");
              console.log(this.jsonNodes);
              //console.log(JSON.stringify(this.jsonNodes));
              //console.log("FFFFFFFFFFFFFFFFFFFF");

            }
          );


        }
  );


  }

  ngOnInit() {

  }

}
