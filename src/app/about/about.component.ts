import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
} from "rxjs";
import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new AsyncSubject(); // will get last emit which is 3, because it's used for long running calculations
    // subject can be observable or observer
    const series$ = subject.asObservable();
    // series$ will be an observable
    series$.subscribe((val) => console.log("early sub: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3); // will log only this

    subject.complete(); // this have to be set

    // setTimeout(() => {
    //     series$.subscribe(val => console.log('late sub: ' + val));
    //     subject.next(4);
    // });
  }
}
