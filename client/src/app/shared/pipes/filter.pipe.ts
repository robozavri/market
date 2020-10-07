import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterBy' })

export class FilterPipe implements PipeTransform {
    transform(items: any[], property: string = '', value: any = ''): any {
        if (!items) {
            return;
        }
        const clone = [...items];
        // return clone.filter(item => item.parent === null);
        return clone.filter(item => item[property] === value);
    }
}