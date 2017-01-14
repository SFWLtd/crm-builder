import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SemanticComponent } from './semantic.component';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        SemanticComponent
    ],
    bootstrap: [
        SemanticComponent
    ]
})

export class SemanticModule { }