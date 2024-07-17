import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
  filter,
  finalize,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");
    const courses$: Observable<Course[]> = http$.pipe(
      tap(() => console.log("http request sent")), // this rxjs operator help to update something outside of observable
      map((res) => Object.values(res["payload"])),
      shareReplay(), //this rxjs operator help us to share our excution to other subscriber
      retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000)))) //this will retry the fetch after 2 seconds, sequencually until fetch succeded
    );
    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
  }
}
