import { NgModule } from '@angular/core';
import { DynamicFormsComponent } from './dynamic-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormsDirective } from './dynamic-forms.directive';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    DynamicFormsComponent,
    DynamicFormsDirective
  ],
  imports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [
    DynamicFormsComponent,
    MatExpansionModule,
    MatButtonModule,
    DragDropModule
  ]
})
export class DynamicFormsModule { }
