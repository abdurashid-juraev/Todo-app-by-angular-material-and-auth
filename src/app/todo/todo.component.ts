import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodo: string = '';
  editingTodo: { id: number, text: string } | any;

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onSubmit(): void {
    if (this.newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        text: this.newTodo.trim(),
        completed: false
      };
      this.todos.push(newTodoItem);
      this.newTodo = '';
      this.saveTodos();
    }
  }

  startEditing(todo: TodoItem): void {
    this.editingTodo = { id: todo.id, text: todo.text };
  }

  updateTodo(id: number): void {
    if (this.editingTodo) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1 && this.editingTodo.text.trim()) {
        this.todos[index].text = this.editingTodo.text.trim();
        this.saveTodos();
      }
      this.editingTodo = null;
    }
  }

  toggleComplete(todo: TodoItem): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  cancelEditing(): void {
    this.editingTodo = null;
  }
}
