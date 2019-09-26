import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoListService} from './todo-list.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public Todo: Todo = null;
  private id: string;
  constructor() { }

  ngOnInit() {
  }

}
