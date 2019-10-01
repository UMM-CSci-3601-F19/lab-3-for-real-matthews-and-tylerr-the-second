import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  constructor(private todoListService: TodoListService ) {

  }

  public updateOwner(newOwner: string): void {
    this.todoOwner = newOwner;
    this.updateFilter();
  }

  public updateStatus(newStatus: string): void {
    newStatus = newStatus.toLowerCase();
    if (newStatus == "complete" || newStatus == "true") {
      this.todoStatus = true;
    }
    if (newStatus == "incomplete" || newStatus == "false") {
      this.todoStatus = false;
    }
    if (newStatus == "") {
      this.todoStatus = null;
    }
    this.updateFilter();
  }

  public updateBody(newBody: string): void {
    this.todoBody = newBody;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredTodos =
      this.todoListService.filterTodos(
        this.todos,
        this.todoOwner,
        this.todoStatus,
        this.todoBody);
  }

  ngOnInit(): void {
    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
      },
      err => {
        console.log(err);
      });
  }

}
