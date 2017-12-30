import { Pipe, PipeTransform } from '@angular/core';
import _ from "lodash";

@Pipe({
  name: 'unique'})
export class UniquePipe implements PipeTransform {

  transform(value: any, aspect: string): any {
    if(value!== undefined && value!== null){
      return _.uniqBy(value, ''+aspect);
    }
    return value;
  }

}
