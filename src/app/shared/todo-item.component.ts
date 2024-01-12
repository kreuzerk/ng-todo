import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Todo} from "../core/todo.model";

@Component({
  standalone: true,
  selector: 'todo-item',
  template: `
    <div class="todo-item">
        {{ todo.title }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoItemComponent {
  @Input({required: true}) todo!: Todo;
}
