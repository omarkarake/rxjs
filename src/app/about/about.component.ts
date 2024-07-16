import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, noop, Observable, Observer, timer } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  counter: number | undefined;
  constructor() {}

  ngOnInit() {
    const http$ = Observable.create((observer) => {
      fetch("/api/courses")
        .then((response) => response.json())
        .then((body) => {
          observer.next(body);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    http$.subscribe(
      course => console.log(course),
      noop, // this is rxjs function stands for no-operation. so no operation for error handling
      ()=> console.log('completed'), //this is call back for completed observable
    )
  }
}
