import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, noop, Observable, Observer, timer } from "rxjs";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  counter: number | undefined;
  constructor() {}
  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");
    const courses$ = http$.pipe(
      map(res => Object.values(res["payload"]))
    )
    courses$.subscribe(
      (course) => console.log(course),
      noop, // this is rxjs function stands for no-operation. so no operation for error handling
      () => console.log("completed") //this is call back for completed observable
    );
  }
}

