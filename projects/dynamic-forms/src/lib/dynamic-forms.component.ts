import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kyu-dynamic-forms',
  templateUrl: "./dynamic-forms.component.html",
  styleUrls: ['./dynamic-forms.css'],

})
export class DynamicFormsComponent implements OnInit {

  panelOpenState: boolean = false;

  // dynamic array params
  public dynamicForm: FormGroup;
  public outer: FormGroup;

  /**
   *Choose input amount
   *
   * @type number
  */
  @Input() num: number;

  /**
   *Choose input data
   *
   * @type unknown
  */
  @Input() data: unknown;

  /**
   *Choose output formData
   *
   * @type EventEmitter<unknown> 
  */
  @Output() formData: EventEmitter<unknown> =new EventEmitter<unknown>();

  /**
   * boolean submitted
   *
   * @type boolean 
  */
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    // Defined formBuilder
    this.dynamicForm = this._formBuilder.group({
      memberOfInfo: ['', Validators.required],
      tickets: new FormArray([])
    });
  }

  // getters form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const memberOfInfo = e; //e.target.value || 0;
    if (this.t.length < memberOfInfo) {
        for (let i = this.t.length; i < memberOfInfo; i++) {
            this.t.push(this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= memberOfInfo; i--) {
            this.t.removeAt(i);
        }
    }
}
  onSubmit() {
    this.submitted = true;
    this.formData.emit(this.t.controls);
}

  public contentForm( name: string = '' , phone: string = '' ) {
    return this._formBuilder.group({
      inputName: name,
      inputPhone: phone
    });

  }
  ngOnInit(): void {
    this.onChangeTickets(this.num);
    this.formData.emit(this.t.controls);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.t.controls, event.previousIndex, event.currentIndex);
    this.formData.emit(this.t.controls);
  }

}
