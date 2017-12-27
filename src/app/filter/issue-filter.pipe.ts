import { Pipe, PipeTransform } from '@angular/core';

import { Issue } from '../model/issue';

@Pipe({
    name: 'issuefilter',
    pure: false
})
export class IssueFilterPipe implements PipeTransform {
    transform(items: Issue[], filter: Issue): Issue[] {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        // schaut item für item ob es behalten werden kann
        return items.filter((item: Issue) => this.applyFilter(item, filter));
    }

    /**
     * Perform the filtering.
     *
     * @param {Book} item The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     */
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
}