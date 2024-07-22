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
  ReplaySubject,
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
    const subject = new ReplaySubject(); // will get last emit which is 3, because it's used for long running calculations
    // subject can be observable or observer
    const series$ = subject.asObservable();
    // series$ will be an observable
    series$.subscribe((val) => console.log("early sub: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3); // will log only this

    // subject.complete(); // this have to be set

    setTimeout(() => {
        series$.subscribe(val => console.log('late sub: ' + val));
        subject.next(4);
        // will replay the emits and emit next(4) on early and late like: 
        /* 
            early sub: 1
            early sub: 2
            early sub: 3
            // replaying
            late sub: 1
            late sub: 2
            late sub: 3
            // early sub and new sub
            early sub: 4
            late sub: 4
        */
    });
  }
}
