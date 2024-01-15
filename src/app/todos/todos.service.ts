import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from "./todo.model";

const BE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos = signal<Todo[]>([]);
  private httpClient = inject(HttpClient);

  public getTodos()  {
    return this.httpClient.get<Todo[]>(`${BE_URL}/todos`).subscribe(
      todos => this.todos.set(todos)
    );
  }

  public addTodo(todo: string) {
    return this.httpClient.post<Todo>(`${BE_URL}/todos`, {
      title: todo,
      done: false
    }).subscribe(
      newTodo => this.todos.update(t => [...t, newTodo])
    );
  }

  public deleteTodo(id: string) {
    return this.httpClient.delete<Todo>(`${BE_URL}/todos/${id}`).subscribe(
      todos => this.todos.update(todos => todos.filter(
        todo => todo.id !== id
      ))
    )
  }
}
