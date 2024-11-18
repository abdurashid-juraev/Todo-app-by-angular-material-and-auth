import { Component } from '@angular/core';
import { FormComponent } from './component/form/form.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
