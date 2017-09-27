import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Factor} from "./model/factor";

@Injectable()
export class FactorsServiceService {

//declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  private factorsUrl = 'http://localhost:4200/factors';  // URL to web API

  constructor(private http: Http) { }



  // Get all posts from the API
  getAllFactors(): Observable<Factor[]> {
    console.log('enteres');
    return this.http.get(this.factorsUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  /*
   getAllAspects() {
   return this.http.get(this. factorsUrl)
   .map(res => res.json());
   }
   */

  getAspect(id:number) {
    console.log('getFactor'+id);

    return this.http.get(this.factorsUrl + '/' + id).map(res => res.json());
  }/*
 updateBear(_id: number, name: string, age: number) {
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 console.log('updateBear'+_id);

 return this.http.put(this. factorsUrl + '/' + _id, { _id, name, age }, options).map(res => res.json());
 }

 create(_id: number, name: string, age: number, photo: string): Observable<Bear> {
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 this.uploader = new FileUploader({url: URL, itemAlias: 'photo'});
 return this.http.post(this. factorsUrl, { _id, name, age, photo }, options)
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
    console.log(body);
    console.log('extractData');

    // no body.data!
    return body || { };
  }

  private handleError (error: Response | any) {
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
