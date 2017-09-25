import {
    Component,
    Directive,
    ElementRef,
    Renderer
} from '@angular/core';
@Directive({
    selector: '[template]' // using [ ] means selecting attributes
})
export class TemplateDirective {
    constructor(
        public element: ElementRef,
        public renderer: Renderer
    ) {
        /* renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large'); */
    }
}