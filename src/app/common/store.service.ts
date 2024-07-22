import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "../model/course";
import { Component, OnInit } from "@angular/core";
import { interval, noop, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";
import { fromPromise } from "rxjs/internal-compatibility";

@Injectable({
  providedIn: "root", // means that there is only one store in the whole application
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable("/api/courses");
    http$
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => Object.values(res["payload"]))
      )
      .subscribe((courses) => this.subject.next(courses));
  }
  selectBeginnersCourses(): Observable<Course[]> {
    return this.filterByCategory("BEGINNER");
  }
  selectAdvancedCourses(): Observable<Course[]> {
    return this.filterByCategory("ADVANCED");
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }

  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex((course) => course.id == courseId);
    const newCourses = courses.slice(0);
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };
    this.subject.next(newCourses);
    return fromPromise(fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
            'content-type': 'application/json'
        }
    }));
  }
}
