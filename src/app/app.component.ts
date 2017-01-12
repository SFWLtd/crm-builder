import { Component } from '@angular/core';
declare var $:JQueryStatic;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    title = 'CRM Builder';

    constructor() {
        $('.ui.dropdown').dropdown();
    }
}
