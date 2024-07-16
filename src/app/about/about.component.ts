import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, timer } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  counter: number | undefined;
  constructor() {}

  ngOnInit() {
    // streams
    // this give us callback hell

    /*document.addEventListener("click", (e) => {
      console.log(e);
      setTimeout(() => {
        console.log("finished...");
        this.counter = 0;
        setInterval(() => {
          console.log(this.counter);
          this.counter++;
        }, 1000);
      }, 3000);
    });
    --------------------------*/

    // let's define a stream observable
    const interval$ = interval(1000);
    // timer(delay, interval) observable
    const interval2$ = timer(3000, 1000);
    // stream for click event observable
    const click$ = fromEvent(document, "click");

    // interval$ is an observable
    const sub = interval2$.subscribe((val) => console.log("stream 1: ", val));
    setTimeout(()=>{sub.unsubscribe()}, 5000)
    // interval2$.subscribe((val) => console.log("stream 2: ", val));
    click$.subscribe(
      (event) => console.log(event),
      (err) => console.log(err),
      () => console.log("completed")
    );
  }
}
