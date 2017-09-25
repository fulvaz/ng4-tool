import {
    Pipe,
    PipeTransform,
    NgModule
} from '@angular/core';

@Pipe({
    name: 'template'
})

export class TemplatePipe implements PipeTransform {
    public transform(value: any, format: string = ''): string {
        // Try and parse the passed value.
       return value;
    }
}
