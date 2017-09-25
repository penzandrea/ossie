import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AspectsService } from '../aspects.service';
import { Aspect } from '../model/aspect';



@Component({
  selector: 'app-aspects',
  templateUrl: './aspects.component.html',
  styleUrls: ['./aspects.component.css']
})
export class AspectsComponent implements OnInit {
  // instantiate posts to an empty array
  aspects: Aspect[];
  selectedAspect: Aspect;
  errorMessage: string;

  constructor(private aspectsService: AspectsService, private router: Router) {}

  ngOnInit() {
    this.getAspects();
  }
  newBear(){
     this.router.navigate(['/bear']);
  }
  getAspects(){
      // Retrieve posts from the API
    this.aspectsService.getAllAspects()
    .subscribe(
      aspects =>  this.aspects = aspects,
      error =>  this.errorMessage = <any>error);
    /*
    this.aspectsService.getBear().subscribe(
        users => console.log('users', users), 
        error => console.error('error', error));
        */
  }


  onSelect(editAspect: Aspect): void {
      this.selectedAspect = editAspect;
    console.log('click'); 

    this.router.navigate(['/bearform', this.selectedAspect.id]);
    //bearchy => console.log('bearchy', bearchy);
    //console.log('click'); 
    //console.log(bearchy); 

  }


  edit(bearchy: Aspect){


      this.selectedAspect = bearchy;
    console.log('clickkk'); 

    this.router.navigate(['/bear', this.selectedAspect.id]);
    //bearchy => console.log('bearchy', bearchy);
    //console.log('click'); 
    //console.log(bearchy); 
  }
/*
  addBear(_id: number, name: string, age: number, img: string) {
    if (!name || !_id || !age) { return; }
    this.aspectsService.create(_id, name, age, img)
                     .subscribe(
                       hero  => this.aspects.push(hero));
                       this.selectedBear = null;

  }
*/
}
