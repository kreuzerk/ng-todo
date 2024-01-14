import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit, Signal,
  signal,
  ViewChild
} from "@angular/core";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

import TodoItemComponent from "../../shared/todo-item.component";
import {TodosService} from "../../core/todos.service";
import {Todo} from "../../core/todo.model";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'todo-editor',
  template: `
      <div class="todo-editor">
      <input
              placeholder="What needs to be done?"
              type="text"
              [(ngModel)]="inputValue"
              (keydown.enter)="addTodo()"
      />
      @for (todo of todos();track $index) {
          <todo-item [todo]="todo" (onDelete)="deleteTodo(todo.id)"/>
      }
      </div>
      <span class="made-with-heart">
          made with ❤️ by Nivek
      </span>
  `,
  imports: [
    TodoItemComponent,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoEditorComponent {
  private destroyRef = inject(DestroyRef);
  private todosService = inject(TodosService);
  inputValue = '';

  todos = signal<Todo[]>([]);

  constructor() {
    this.todosService.getTodos().pipe(
      takeUntilDestroyed()
    ).subscribe(todos =>
      this.todos.set(todos)
    );
  }

  addTodo(){
    this.todosService.addTodo(
      this.inputValue
    )
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(todo => {
        this.todos.update(todos => [...todos, todo]);
        this.inputValue = '';
      });
  }

  deleteTodo(id: string){
    this.todosService.deleteTodo(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(todo => {
        this.todos.update(todos => todos.filter(t => t.id !== id));
      });
  }

}
