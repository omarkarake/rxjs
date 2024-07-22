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
    const subject = new BehaviorSubject(0); // initial value
    // subject can be observable or observer
    const series$ = subject.asObservable();
    // series$ will be an observable
    series$.subscribe((val) => console.log("early sub: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);

    // subject.complete(); // if set will not trigger the late sub

    setTimeout(() => {
        // if subject.complete() called before setTimeOut we would have:
        /*
            early sub: 0
            early sub: 1
            early sub: 2
            early sub: 3
        */
       // if subject.complete() not called
       /*
            early sub: 0
            early sub: 1
            early sub: 2
            early sub: 3
            late sub: 3
            early sub: 4
            late sub: 4
       */
        
        series$.subscribe(val => console.log('late sub: ' + val));
        subject.next(4);
    });
  }
}
