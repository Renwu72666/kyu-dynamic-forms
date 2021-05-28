import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'example';
  inputNum: number = 2
  // @Output() formData: unknown;
  @Output() reData = new EventEmitter<unknown>();

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(this.reData.emit())
    // console.log(this.newItemEvent)
    console.log(this.reData.emit())

  }
  itemsOfControls(e) {

    console.log(e)
  }
}
