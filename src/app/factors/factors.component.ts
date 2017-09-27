import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { FactorsServiceService } from '../factors-service.service';
import { Factor } from '../model/factor';

@Component({
    selector: 'app-factors',
    templateUrl: './factors.component.html',
    styleUrls: ['./factors.component.css']
})
export class FactorsComponent implements OnInit {
    // instantiate posts to an empty array
    factors: Factor[];
    selectedFactor: Factor;
    errorMessage: string;

    constructor(private factorService: FactorsServiceService, private router: Router) {
    }


    ngOnInit() {
        this.getFactors();
    }

    newBear() {
        this.router.navigate(['/bear']);
    }

    getFactors() {
        // Retrieve posts from the API
        this.factorService.getAllFactors()
            .subscribe(
                aspects => this.factors = aspects,
                error => this.errorMessage = <any>error);
        /*
         this.factorService.getBear().subscribe(
         users => console.log('users', users),
         error => console.error('error', error));
         */
    }


    onSelect(editAspect: Factor): void {
        this.selectedFactor = editAspect;
        console.log('click');

        this.router.navigate(['/bearform', this.selectedFactor.id]);
        //bearchy => console.log('bearchy', bearchy);
        //console.log('click');
        //console.log(bearchy);

    }


    edit(bearchy: Factor) {


        this.selectedFactor = bearchy;
        console.log('clickkk');

        this.router.navigate(['/bear', this.selectedFactor.id]);
        //bearchy => console.log('bearchy', bearchy);
        //console.log('click');
        //console.log(bearchy);
    }

    /*
     addBear(_id: number, name: string, age: number, img: string) {
     if (!name || !_id || !age) { return; }
     this.factorService.create(_id, name, age, img)
     .subscribe(
     hero  => this.aspects.push(hero));
     this.selectedBear = null;

     }
     */
}

