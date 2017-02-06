import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SuggestComponent } from './suggest/search.component';
import { SuggestService } from "./services/suggest.service";

@NgModule({
  declarations: [
    AppComponent,
    SuggestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [SuggestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
