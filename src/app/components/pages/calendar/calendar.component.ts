import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public month;
  public year;

  constructor() { }

  ngOnInit(): void {
  }


  numberReturn(length){
    return new Array(length);
  }

  numberReturnSemanas(){
    let length = Math.trunc(31 / 7) + 1;
    return new Array(length);
  }

}
