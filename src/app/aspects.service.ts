import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Aspect} from "./model/aspect";
import {ActivatedRoute} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class AspectsService {

    //declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    private aspectsUrl = 'http://localhost:4200/aspects';  // URL to web API
    private baseAspectNode = 411;
    allAspects: Aspect[];
    errorMessage: string;

    constructor(private http: Http,
                private actrout: ActivatedRoute) {
        this.getAllAspects()
            .subscribe(
                aspects => this.allAspects = aspects,
                error => this.errorMessage = <any>error);
    }

    getAspectChildren(aspect: Aspect){
        console.log('TEST'+ aspect.id +'TEST');
        console.log(this.aspectsUrl + '/' + aspect.id + '/children');

        return this.http.get(this.aspectsUrl + '/' + aspect.id + '/children')
            .map(this.extractData)
            .catch(this.handleError);
    };

    extractDataLevels(res: Response, str: string) {
        //console.log('extractData ASPECT RAW Start');
        console.log('extractDataLevelsextractDataLevelsextractDataLevels');

        console.log(res);
        //console.log('extractData ASPECT RAW End');

        let body = res.json();
        console.log(body.aspectItemInfoDtos + 'children');

        //console.log('extractData ASPECT Start');
        //console.log(body);
        let childarray;
        //console.log(this.aspectsUrl + '//children'); // 1, "string", false

/*        for (let aspect of body.aspectItemInfoDtos) {
            //console.log(aspect.id); // 1, "string", false
            //console.log(this.aspectsUrl + '/' + aspect.id + '/children'); // 1, "string", false

            this.http.get(this.aspectsUrl + '/' + aspect.id + '/children')
                .map((res) => this.somefct(res, aspect.id))
                .catch(this.handleError);

        }*/
        //console.log('extractData ASPECT End');

        // no body.data!
        return body.aspectItemInfoDtos || {};
    }

    getChildrenForEachProcess(alliAspects: Aspect[]) {
        console.log('this.allAspects START');
        this.allAspects = alliAspects;
        console.log("this.allAspects ready for mapping?");
        console.log(this.allAspects);
        //console.log(alliAspects);
        //console.log(alliAspects[0]);
        let aspchil = this.getAspectChildren(alliAspects[0]);
        console.log(aspchil);

        console.log('this.allAspects END');


        var a = ["a", "b", "c"];
        a.forEach(function(entry, index) {
            console.log(entry[index]);
            console.log(entry[index]);

        });
        let childrenObservables = this.allAspects.map((aspect, aspectIdx) => {
         return this.getAspectChildren(aspect)
         .map(children => {
         //this.allAspects[aspectIdx].children = children; // assign children to each aspect as they arrive
             console.log(children);
         return children;
         })
         .catch((error: any) => {
         console.error('Error loading children for aspect: ' + aspect, 'Error: ', error);
         return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
         });
         });
               /*let childrenObservables = this.allAspects.map(aspect, aspectIdx) => {
                    return this.getAspectChildren(aspect)
                        .map(children => {
                            this.aspects[aspectIdx].children = children; // assign children to each aspect as they arrive
                            return children;
                        })
                        .catch((error: any) => {
                            console.error('Error loading children for aspect: ' + aspect, 'Error: ', error);
                            return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
                        });
                });*/

            return Observable.forkJoin(childrenObservables);
};



    /*  getIssues(id: number) {
     //this.setup();
     console.log('getAspects(id:number)');

     console.log('getAspect' + id);

     return this.http.get(this.aspectsUrl + '/' + id + '/issues').map((res) => this.extractData(res))
     .catch(this.handleError);
     }*/

    /*  setup() {
     this.actrout.params.subscribe(params => {
     this.aspectID = +params['id']; // (+) converts string 'id' to a number
     console.log(params['id']);

     // In a real app: dispatch action to load the details here.
     });
     console.log("SETUP");
     console.log(this.aspectID);

     }*/



    getAspect(id: number) {
        console.log('getAspecttt' + id);

        return this.http.get(this.aspectsUrl + '/' + id).map(res => res.json());
    }

    /*
     updateBear(_id: number, name: string, age: number) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     console.log('updateBear'+_id);

     return this.http.put(this.aspectsUrl + '/' + _id, { _id, name, age }, options).map(res => res.json());
     }

     create(_id: number, name: string, age: number, photo: string): Observable<Bear> {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     this.uploader = new FileUploader({url: URL, itemAlias: 'photo'});
     return this.http.post(this.aspectsUrl, { _id, name, age, photo }, options)
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

    aspectsSubject = new Subject<Aspect[]>();

    getAllAspectsFromServer() {
        this.http.get(this.aspectsUrl)
            .map(this.extractDataAddChildren)
            .subscribe(
                data => { this.aspectsSubject.next(data); },
                error => { console.log(error) });
    }


    getAllAspects(): Observable<Aspect[]> {
        //this.setup();
        //console.log('enter getAllAspects');

        /*let body = res.json();
        console.log('extractData ASPECT Start');
        console.log(body);
        console.log('extractData ASPECT End');

        // no body.data!
        return body.aspectItemInfoDtos || {};*/

        // return this.http.get(this.aspectsUrl)
        //     .map((r: Response) => r.json().aspectItemInfoDtos as Aspect)
        //     .catch(this.handleError);

        return this.http.get(this.aspectsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFirstLevelAspects(): Observable<Aspect[]> {
        //this.setup();
        //console.log('enter getFirstLevelAspects');
        //console.log(this.aspectsUrl);

        return this.http.get(this.aspectsUrl + '/' + this.baseAspectNode + '/children')
            .map((res) => this.extractDataLevels(res, this.aspectsUrl))
            .catch(this.handleError);

        /* return this.http.get(this.aspectsUrl)
         .map(this.extractData)
         .catch(this.handleError);*/
    }

    getLevelAspects(): Observable<Aspect[]> {
        //this.setup();
        //console.log('enter getFirstLevelAspects');

        return this.http.get(this.aspectsUrl + '/' + this.baseAspectNode + '/children')
            .map(this.extractData)
            .catch(this.handleError);

        /* return this.http.get(this.aspectsUrl)
         .map(this.extractData)
         .catch(this.handleError);*/
    }

    somefct(res: Response, no: number) {
/*
        let levelAspect = res.json();
*/
        // console.log("1");
        //
        // console.log(no);
        // console.log("2");
        //
        // console.log(levelAspect);
        // console.log("3");

        let levelNode = "levelAspect.aspectItemInfoDtos";
        console.log("4");

        //console.log(levelNode);
        console.log(res);


        return levelNode;
    }


    private extractDataAddChildren(res: Response) {
        console.log('ADDCHILDREN');
        // console.log(res);
        // console.log('extractData ASPECT RAW End');

        let body = res.json();
        /*        body.aspectItemInfoDtos.map(thing) => {

         }*/
        for (let key in body.aspectItemInfoDtos) {
            //let tudldu = [ new Aspect("1111", "test", "test", null) ];
            body.aspectItemInfoDtos[key].children = null;
            console.log(body.aspectItemInfoDtos[key]);
        }

        // console.log('extractData ASPECT Start');
        // console.log(body);
        // console.log('extractData ASPECT End');

        // no body.data!
        return body.aspectItemInfoDtos || {};
    }

    private extractData(res: Response) {
        // console.log('extractData ASPECT RAW Start');
        // console.log(res);
        // console.log('extractData ASPECT RAW End');

        let body = res.json();
        // console.log('extractData ASPECT Start');
        // console.log(body);
        // console.log('extractData ASPECT End');

        // no body.data!
        return body.aspectItemInfoDtos || {};
    }

    private handleError(error: Response | any) {
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
