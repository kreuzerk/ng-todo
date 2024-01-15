import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";

import TodoItemComponent from "./todo-item.component";
import {TodosService} from "./todos.service";

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
export default class TodoEditorComponent implements OnInit {
  private todosService = inject(TodosService);
  inputValue = '';

  todos = this.todosService.todos;

  ngOnInit(): void {
    this.todosService.getTodos()
    }

  addTodo(){
    this.todosService.addTodo(this.inputValue);
    this.inputValue = '';
  }

  deleteTodo(id: string){
    this.todosService.deleteTodo(id);
  }

}
