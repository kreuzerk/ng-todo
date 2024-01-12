import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "./todo.model";

const BE_URL = 'http://localhost:3000/';
let counter = 0;

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private httpClient = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${BE_URL}todos`);
  }

  public addTodo(title: string): Observable<Todo> {
    const newTodo = {
      title,
      done: false
    }
    return this.httpClient.post<Todo>(`${BE_URL}todos`, newTodo);
  }
}
