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
  constructor(private http: Http,
              private router: Router,
              private actrout: ActivatedRoute
  ) { }

setup(){
  this.actrout.params.subscribe(params => {
    this.projectID = +params['id']; // (+) converts string 'id' to a number
    console.log(params['id']);

    // In a real app: dispatch action to load the details here.
  });
  console.log("SETUP");
  console.log(this.projectID);

}

  // Get all posts from the API
  getAllIssues(): Observable<Issue[]> {
  this.setup();
    console.log('enteres');

    return this.http.get(this.issuesUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getIssues(id:number) {
    this.setup();
    console.log('getIssues(id:number)');

    console.log('getIssue'+id);

    return this.http.get(this.issuesUrl + '/' + id + '/issues').map(this.extractData)
        .catch(this.handleError);
  }

  /*
   getAllAspects() {
   return this.http.get(this. issuesUrl)
   .map(res => res.json());
   }
   */


  updateIssue(id: number, name: string, sonarkey: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    console.log('updateBear'+id);

    //return this.http.put(this. issuesUrl + '/' + id, { id, name, sonarkey }, options).map(res => res.json());
    return null;
  }
  /*
   create(_id: number, name: string, age: number, photo: string): Observable<Bear> {
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   this.uploader = new FileUploader({url: URL, itemAlias: 'photo'});
   return this.http.post(this. issuesUrl, { _id, name, age, photo }, options)
   .map(this.extractData)
   .catch(this.handleError);
   }
   */
  /*
   getAspect(id: number) {
   return this.http.get('http://localhost:4200/api/bears')
   .map(res => res.json());
   }
   */

  private extractData(res: Response) {
    let body = res.json();
    console.log('extractData');
    console.log(body.issues);
    console.log('extractData');

    // no body.data!
    return body.issues || { };
  }

  private handleError (error: Response | any) {
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
