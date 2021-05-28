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
   *Choose inpunt amount
   *
   * @type number
  */
   @Input() num: number;

   @Input() data: unknown;

   submitted = false;

  //  @Output() formData: unknown;
  @Output() formData: EventEmitter<unknown> =new EventEmitter<unknown>();

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
  ];

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.dynamicForm = this._formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    });
  }
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e//e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}
  onSubmit() {
    this.submitted = true;
    this.formData.emit(this.t.controls);

    // console.log(this.dynamicForm.value)
    // console.log(this.t.controls[0].value)
    // console.log(this.t.controls[1].value)

    // stop here if form is invalid
    // if (this.dynamicForm.invalid) {
    //     return;
    // }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.t.value, null, 4));
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
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

    // this.formData = this.t.controls;
    // console.log(this.num)
    // this.dynamicForm = this._formBuilder.group({
    //   listData: [this.contentForm()]
    //   // inputName: [''],
    //   // inputPhone: ['']
    //   // list: new FormArray([])
    // });
    // for( let i = 0 ; i< this.num ; i++ ) {
    //   (this.dynamicForm.get('contacts') as FormArray).push(this.contentForm());
    // }
    // console.log(this.dynamicForm)
    // console.log(this.dynamicForm.controls)
    // this.dynamicForm = this._formBuilder.group({
    //   attachmentImgGroup: new FormArray([])
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.t.controls, event.previousIndex, event.currentIndex);
    this.formData.emit(this.t.controls);

    // this.formData = this.t.controls;
  }

}
