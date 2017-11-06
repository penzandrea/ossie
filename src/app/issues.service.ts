import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Issue} from "./model/issue";
import {Router, ActivatedRoute} from "@angular/router";


@Injectable()
export class IssuesService {

    //declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    private issuesUrl = 'http://localhost:4200/projects/';  // URL to web API
    private projectID;
    private groupByIndex = 2;

    constructor(private http: Http,
                private router: Router,
                private actrout: ActivatedRoute) {
    }

    setup() {
        this.actrout.params.subscribe(params => {
            this.projectID = +params['id']; // (+) converts string 'id' to a number
            console.log(params['id']);

            // In a real app: dispatch action to load the details here.
        });
        console.log("SETUP");
        console.log(this.projectID);

    }

    getAllIssues(): Observable<Issue[]> {
        this.setup();
        console.log('enteres');

        return this.http.get(this.issuesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getIssues(id: number) {
        this.setup();
        console.log('getIssues(id:number)');

        console.log('getIssue' + id);

        return this.http.get(this.issuesUrl + '/' + id + '/issues').map((res) => this.extractData(res))
            .catch(this.handleError);
    }


    getIssuesGroupedByRule(id: number) {
        this.setup();
        //console.log('getIssues(id:number)');

        //console.log('getIssue' + id);



        return this.http.get(this.issuesUrl + '/' + id + '/issues').map((res) => this.extractDataGroupedByRule(res, "rule"))
            .catch(this.handleError);
    }

    updateIssue(id: number, name: string, sonarkey: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers: headers });
        console.log('updateBear' + id);

        //return this.http.put(this. issuesUrl + '/' + id, { id, name, sonarkey }, options).map(res => res.json());
        return null;
    }
    addGroup(key, value):any {
        return {"key": key, "value": value};
    }



    getIssuesGroupedBySeverity(id: number) {
        this.setup();
        return this.http.get(this.issuesUrl + '/' + id + '/issues').map(this.extractDataGroupedBySeverity)
    .catch(this.handleError);
    }


    getIssuesGroupedByComponent(id: number) {
        this.setup();
        return this.http.get(this.issuesUrl + '/' + id + '/issues').map(this.extractDataGroupedByComponent)
            .catch(this.handleError);
    }


    extractDataByFeature(res: Response, feature: string) {
        let body = res.json();
        console.log(body.issues);
        console.log(feature);

        //return body.issues || {};
        // create a map to hold groups with their corresponding results
        const xyz = new Map();

        body.issues.forEach((item) => {
            const key = item[feature];

            if (!xyz.has(key)) {
                xyz.set(key, [item]);
            } else {
                xyz.get(key).push(item);
            }
        });

        xyz.forEach((value, key) => {
            key = "Dr" + key;
        });

        console.log("2");
        console.log(xyz);

        // convert map back to a simple array of objects
        let groups = Array.from(xyz);

        //let groupings = JSON.stringify(xyz);
        let groupings = JSON.stringify(groups);

        // output groups to the console for demostration
        console.log("map = ", xyz);
        console.log("groups = ", groups);
        console.log("typeof = ", typeof groups);

        //console.log("groupings = ", groupings);

        //console.log(groups);
        return groups;

    }


    extractDataGroupedByRule(res: Response, feature: string) {
        let body = res.json();
        console.log("-----------extractDataGroupedByRuleextractDataGroupedByRule--------");

        console.log(body.issues);
        console.log(feature);

        //return body.issues || {};


        // create a map to hold groups with their corresponding results
        const xyz = new Map();

        console.log("1");

        //console.log(xyz);

        body.issues.forEach((item) => {
             const key = item[feature];

            //const key = item.rule;
/*            console.log("item ");
            console.log(item);
            console.log("item.rule");
            console.log(item.rule);
            console.log("KEY "+ key);*/
            if (!xyz.has(key)) {
                xyz.set(key, [item]);
            } else {
                xyz.get(key).push(item);
            }
        });

        xyz.forEach((value, key) => {
            key = "Dr" + key;
        });
            /*            console.log("item ");
             console.log(item);
             console.log("item.rule");
             console.log(item.rule);
             console.log("KEY "+ key);*/


        console.log("2");

        console.log(xyz);

        // convert map back to a simple array of objects
        let groups = Array.from(xyz);

        //let groupings = JSON.stringify(xyz);
        let groupings = JSON.stringify(groups);

        // output groups to the console for demostration
        console.log("map = ", xyz);
        console.log("groups = ", groups);
        console.log("typeof = ", typeof groups);

        //console.log("groupings = ", groupings);

        //console.log(groups);
        return groups;

    }



    private extractData(res: Response) {
        let body = res.json();
        console.log('extractData');
        console.log(body.issues);
        console.log('extractData');

        // no body.data!
        return body.issues || {};
    }
    extractDataGroupedBySeverity(res: Response) {
        let body = res.json();
        console.log("-----------Severity--------");

        console.log(body.issues);

        const xyz = new Map();

        console.log("1");


        body.issues.forEach((item) => {
            const key = item.severity;
            /*            console.log("item ");
             console.log(item);
             console.log("item.rule");
             console.log(item.rule);
             console.log("KEY "+ key);*/
            if (!xyz.has(key)) {
                xyz.set(key, [item]);
            } else {
                xyz.get(key).push(item);
            }
        });

        console.log("2");
        console.log(xyz);

        // convert map back to a simple array of objects
        let groups = Array.from(xyz);

        //let groupings = JSON.stringify(xyz);
        let groupings = JSON.stringify(groups);

        // output groups to the console for demostration
        console.log("map = ", xyz);
        console.log("groups = ", groups);
        console.log("typeof = ", typeof groups);

        //console.log("groupings = ", groupings);

        //console.log(groups);
        return groups;

    }


    extractDataGroupedByComponent(res: Response) {
        let body = res.json();
        console.log("-----------Component--------");

        const xyz = new Map();

        body.issues.forEach((item) => {
            const key = item.component;

            if (!xyz.has(key)) {
                xyz.set(key, [item]);
            } else {
                xyz.get(key).push(item);
            }
        });

        // convert map back to a simple array of objects
        let groups = Array.from(xyz);

        //let groupings = JSON.stringify(xyz);
        let groupings = JSON.stringify(groups);

        return groups;

    }


    private handleError(error: Response | any) {
        console.log('error');
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
