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
  editingTodo: TodoItem | null = null;
  private readonly STORAGE_KEY = 'todos';

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.todos = JSON.parse(stored);
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  onSubmit(): void {
    if (this.newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now(),
        text: this.newTodo.trim(),
      };
      this.todos.push(todo);
      this.saveTodos();
      this.newTodo = '';
    }
  }

  startEditing(todo: TodoItem): void {
    this.editingTodo = { ...todo };
  }

  updateTodo(id: number): void {
    if (this.editingTodo && this.editingTodo.text.trim()) {
      const index = this.todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.todos[index] = { ...this.editingTodo };
        this.saveTodos();
      }
      this.editingTodo = null;
    }
  }

  cancelEditing(): void {
    this.editingTodo = null;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }
}
