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
  filterTodos(todos: Todo[], searchOwner?: string, searchStatus?: boolean): Todo[] {

    let filteredTodos = todos;

    // Filter by Owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return !searchOwner || todo.Owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by Status
    if (searchStatus != null) {
      filteredTodos = filteredTodos.filter((todo: Todo) => {
        return !searchStatus || (todo.Status === Boolean(searchStatus));
      });
    }

    return filteredTodos;
  }
}
