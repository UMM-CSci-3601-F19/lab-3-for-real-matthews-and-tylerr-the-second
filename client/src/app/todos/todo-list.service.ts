import { Injectable } from '@angular/core';
import { Todo } from './todo';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }
  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }
  filterTodos(todos: Todo[], searchOwner?: string, searchStatus?: boolean, searchBody?: string): Todo[] {

    let filteredTodos = todos;

    // Filter by Owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by Status
    // !searchStatus || removed
    if (searchStatus != null) {
      filteredTodos = filteredTodos.filter((todo: Todo) => {
        return todo.status === Boolean(searchStatus);
      });
    }

    // Filter by Body
    if (searchBody != null) {
      filteredTodos = filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    return filteredTodos;
  }
}
