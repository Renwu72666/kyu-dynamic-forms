import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormsModule } from 'projects/dynamic-forms/src/lib/dynamic-forms.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DynamicFormsModule } from 'dynamic-forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
