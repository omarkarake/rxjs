import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "../model/course";

@Injectable({
    providedIn: 'root' // means that there is only one store in the whole application
})
export class Store {
    private subject = new BehaviorSubject<Course[]>([]);
    course$ : Observable<Course[]> = this.subject.asObservable();
}