import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  mergeMap,
  throttleTime,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, forkJoin } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { searchLessons } from "../../../server/search-lessons.route";
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from "../common/debug";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  // this is the reference for input
  @ViewChild("searchInput", { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];
    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
    // .pipe(debug(RxJsLoggingLevel.INFO, "course value "));
    // now we call log trace if we want or debug using this function
    // setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
  
    this.lessons$ = this.loadLessons(); // Assign the lessons observable to this.lessons$
    
    // this will handling parallel http request, and each of them must complete
    forkJoin([this.course$, this.lessons$])
      .pipe(
        tap(([course, lessons]) => {
          console.log("course", course);
          console.log("lessons", lessons);
        })
      )
      .subscribe();
  }
  

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, "keyup")
      .pipe(
        map((e) => e.target.value),
        throttleTime(500)
      )
      .subscribe(console.log);
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((response) => response["payload"]));
  }
}
