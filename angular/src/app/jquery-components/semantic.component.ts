import { Component, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: "[semantic-init]"
})

export class SemanticComponent {
    constructor(el: ElementRef) {
        jQuery(el.nativeElement).dropdown();
    }
}