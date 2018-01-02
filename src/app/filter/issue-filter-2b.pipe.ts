import { Pipe, PipeTransform } from '@angular/core';

import { Issue } from '../model/issue';

@Pipe({
    name: 'issuefilter2b'})

/*
 @Pipe({
 name: 'issuefilter2',
 pure: false
 })

export class IssueFilterPipeTwo implements PipeTransform {
    transform(items: Issue[], filter: Issue): Issue[] {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        // schaut item für item ob es behalten werden kann
        return items.filter((item: Issue) => this.applyFilter(item, filter));
    }

    /!**
     * Perform the filtering.
     *
     * @param {Book} item The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     *!/
    applyFilter(item: Issue, filter: Issue): boolean {
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
        return true;
    }
}*/
export class IssueFilterPipeTwoB implements PipeTransform {
    transform(items: Issue[], filterRule: Array<string>): Issue[] {
        if (!items || (filterRule.length < 1)) {
            console.log('filterRule.length < 1');
            return items;
        }
        console.log('%%%%%%%%%%%%%%%%%%%');

        // filter items array, items which match and return true will be kept, false will be filtered out
        // schaut item für item ob es behalten werden kann
        return items.filter((item: Issue) => this.applyFilter(item, filterRule));
    }

    /*
     * Perform the filtering.
     *
     * @param {Book} item The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     */
    applyFilter(item: Issue, filterRule: Array<string>): boolean {
        console.log('let field in filterRule');

        console.log(filterRule);
        console.log('let field in filterRule');


        for (let field in filterRule) {
            if (filterRule[field]) {
                if (item['rule'].toLowerCase().indexOf(filterRule[field].toLowerCase()) !== -1) {
                    return true;
                }
            }
        }

        return false;

    }

/*export class IssueFilterPipeTwo implements PipeTransform {
    transform(items: Issue[], filterSeverity: Array<string>): Issue[] {
        if (!items || (filterSeverity.length < 1)) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        // schaut item für item ob es behalten werden kann
        return items.filter((item: Issue) => this.applyFilter(item, filterSeverity));
    }

    /!**
     * Perform the filtering.
     *
     * @param {Book} item The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     *!/
    applyFilter(item: Issue, filterSeverity: Array<string>): boolean {
        console.log(filterSeverity);


        for (let field in filterSeverity) {
            let showSeverity: boolean;
            if (filterSeverity[field]) {
                if (item['severity'].toLowerCase().indexOf(filterSeverity[field].toLowerCase()) !== -1) {
                    return true;
                }
            }
        }

        return false;

    }*/

            /*        for (let field in filter) {
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
                    }*/

}
