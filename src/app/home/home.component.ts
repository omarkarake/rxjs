import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
  filter,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginerCourses: Course[];
  advancedCourses: Course[];

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");
    const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));
    courses$.subscribe(
      (courses) => {
        this.beginerCourses = courses.filter((course) => course.category == "BEGINNER");
        this.advancedCourses = courses.filter((course) => course.category == "ADVANCED");
      },
      noop, // this is rxjs function stands for no-operation. so no operation for error handling
      () => console.log("completed") //this is call back for completed observable
    );
  }
}
