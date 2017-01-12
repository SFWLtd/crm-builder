import { Component } from '@angular/core';
import { Cat } from './cat';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    title = 'Cats are awesome';
    cat = new Cat();
}
