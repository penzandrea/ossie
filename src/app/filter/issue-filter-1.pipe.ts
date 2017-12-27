import { Pipe, PipeTransform } from '@angular/core';
import _ from "lodash";

import { Issue } from '../model/issue';

@Pipe({
    name: 'issuefilter1',
    pure: false
})
export class IssueFilterPipeOne implements PipeTransform {
    transform(items: Issue[], filter: Issue, filterOne: Issue): Issue[] {
        if (!items || !filter || !filterOne) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        // schaut item für item ob es behalten werden kann
        return items.filter((item: Issue) => this.applyFilter(item, filter, filterOne));
    }

    isEmpty(obj: Issue){
        return Object.keys(obj).length === 0 && obj.constructor === Issue;
    }

    /**
     * Perform the filtering.
     *
     * @param {Book} item The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     */
    applyFilter(item: Issue, filter: Issue, filterOne: Issue): boolean {
        if (!this.isEmpty(filter) && !this.isEmpty(filterOne)){
            for (let field in filter) {
                for (let fieldOne in filterOne) {
                    if (filter[field] || filterOne[fieldOne]) {

                        // überprüfen auf ungleichheit: wenn nicht ident dann verlasse die schleifenrunde
                        if (typeof filter[field] === 'string' || typeof filterOne[fieldOne] === 'string') {
                            // nicht ident + ident
                            if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1 && item[fieldOne].toLowerCase().indexOf(filterOne[fieldOne].toLowerCase()) === -1) {
                                return false;
                            }
                        } else if (typeof filter[field] === 'number' || typeof filterOne[fieldOne] === 'number') {
                            if (item[field] !== filter[field] && item[fieldOne] !== filterOne[fieldOne]) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        else if (!this.isEmpty(filter) && this.isEmpty(filterOne)) {
            for (let field in filter) {
                if (filter[field]) {
                    if (typeof filter[field] === 'string') {
                        if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                            return false;
                        }
                    } else if (typeof filter[field] === 'number') {
                        if (item[field] !== filter[field]) {
                            return false;
                        }
                    }
                }
            }
        }
        else if (this.isEmpty(filter) && !this.isEmpty(filterOne)) {

            for (let fieldOne in filterOne) {
                if (filterOne[fieldOne]) {
                    if (typeof filterOne[fieldOne] === 'string') {
                        if (item[fieldOne].toLowerCase().indexOf(filterOne[fieldOne].toLowerCase()) === -1) {
                            return false;
                        }
                    } else if (typeof filterOne[fieldOne] === 'number') {
                        if (item[fieldOne] !== filterOne[fieldOne]) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    }
}