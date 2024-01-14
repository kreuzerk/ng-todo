import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "./todo.model";
import {injectMutation, injectQuery, injectQueryClient} from "@ngneat/query";

const BE_URL = 'http://localhost:3000';
let counter = 0;

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private httpClient = inject(HttpClient);
  private query = injectQuery();
  private queryClient = injectQueryClient();
  private mutation = injectMutation();

  public getTodos()  {
    return this.httpClient.get<Todo[]>(`${BE_URL}/todos`);
  }

  public addTodo(todo: string) {
    return this.httpClient.post<Todo>(`${BE_URL}/todos`, {
      title: todo,
      done: false
    })
  }

  public deleteTodo(id: string) {
    return this.httpClient.delete<Todo>(`${BE_URL}/todos/${id}`)
  }
}
