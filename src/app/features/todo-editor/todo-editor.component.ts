import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from "@angular/core";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

import TodoItemComponent from "../../shared/todo-item.component";
import {TodosService} from "../../core/todos.service";
import {Todo} from "../../core/todo.model";

@Component({
  standalone: true,
  selector: 'todo-editor',
  template: `
      <input #input type="text" (blur)="addTodo()"/>
      @for (todo of todos();track $index) {
          <todo-item [todo]="todo"/>
      }

  `,
  imports: [
    TodoItemComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoEditorComponent implements OnInit {

  @ViewChild('input') inputElement!: ElementRef;

  private destroyRef = inject(DestroyRef);
  private todosService = inject(TodosService);
  todos = signal<Todo[]>([]);

  ngOnInit(): void {
    this.todosService.getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.todos.set(e));
  }

  addTodo(){
    this.todosService.addTodo(this.inputElement.nativeElement.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => {
        this.todos.update(v => [...v, e]);
      });
  }

}
