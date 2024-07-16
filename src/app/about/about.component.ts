import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  Observable,
  Observer,
  of,
  timer,
} from "rxjs";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    // const course1$ = of(1, 2, 3);
    // const course1$ = interval(1000); // this means that course2$ and course3$ will not be executed, except if this interval is stopped
    // const course2$ = of(4, 5, 6);
    // const course3$ = of(7, 8, 9);
    // const courses$ = concat(course1$, course2$, course3$)
    // courses$.subscribe(console.log);
  }
}
