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

    aspectsSubject = new Subject<Aspect[]>();

    getAllAspectsFromServer() {
        this.http.get(this.aspectsUrl)
            .map(this.extractDataAddChildren)
            .subscribe(
                data => { this.aspectsSubject.next(data); },
                error => { console.log(error) });
    }

    getChildrenForEachAspect(alliAspects: Aspect[]) {
        this.allAspects = alliAspects;

        let childrenObservables = this.allAspects.map((aspect, aspectIdx) => {
            return this.getAspectChildren(aspect)
                .map(children => {
                    return children;
                })
                .catch((error: any) => {
                    return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
                });
        });

        return Observable.forkJoin(childrenObservables);
    };

    getAspectChildren(aspect: Aspect){
        return this.http.get(this.aspectsUrl + '/' + aspect.id + '/children')
            .map(this.extractDataAddChildren)
            .catch(this.handleError);
    };

    extractDataLevels(res: Response, str: string) {

        let body = res.json();
        console.log(body);

        return body.aspectItemInfoDtos || {};
    }
    extractDataLevelsHasChildren(res: Response, str: string) {

        let body = res.json();
        console.log(body);

        return body.aspectItemInfoDtos || {};
    }

    getChildren(id: number) {

    }

    getAspect(id: number) {
        //console.log('getAspecttt' + id);

        return this.http.get(this.aspectsUrl + '/' + id).map(res => res.json());
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
    getFirstLevelAspectsBaseNode(numb: number): Observable<Aspect[]> {
        //this.setup();
        //console.log('enter getFirstLevelAspects');
        //console.log(this.aspectsUrl);

        return this.http.get(this.aspectsUrl + '/' + numb+ '/children')
            .map((res) => this.extractDataLevelsHasChildren(res, this.aspectsUrl))
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


    private extractDataAddChildren(res: Response): Aspect[] {
        //console.log('ADDCHILDREN');
        // console.log('extractData ASPECT RAW End');

        let body = res.json();
         //console.log(body);

        /*        body.aspectItemInfoDtos.map(thing) => {

         }*/
        let aspectes: Aspect[] = [];
        body.aspectItemInfoDtos.forEach(( singleaspect, k) => {
            aspectes[k] = new Aspect (body.aspectItemInfoDtos[k].id,body.aspectItemInfoDtos[k].name,body.aspectItemInfoDtos[k].description,body.aspectItemInfoDtos[k].children);
            //let tudldu = [ new Aspect("1111", "test", "test", null) ];
            //body.aspectItemInfoDtos[key].children = null;
            //console.log(body.aspectItemInfoDtos[key]);
        });


        // no body.data!
        return aspectes || [new Aspect(999,"","",null)];
    }

    private extractData(res: Response) {


        let body = res.json();


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
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
