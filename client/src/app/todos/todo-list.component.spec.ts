import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {FormsModule} from '@angular/forms';

import {CustomModule} from '../custom.module';

import { Todo } from './todo';
import { TodoListComponent } from './todo-list.component';
import { TodoListService} from './todo-list.service';

describe('Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => of([
        {
          _id: 'chris_id',
          owner: 'Chris',
          status: true,
          body: 'lots of random latin',
          category: 'computer science'
        },
        {
          _id: 'pat_id',
          owner: 'Pat',
          status: false,
          body : 'In',
          category: 'Software Design'
        },
        {
          _id: 'jamie_id',
          owner: 'Jamie',
          status: false,
          body: 'non',
          category: 'Video Games'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ UserListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));
  it('contains all the users', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a owner named \'Chris\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Chris')).toBe(true);
  });

  it('contain a owner named \'Jamie\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Jamie')).toBe(true);
  });

  it('doesn\'t contain a owner named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('has two users that are false status', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.status === false).length).toBe(2);
  });
});

  describe('Misbehaving Todo List', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
      getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
      // stub UserService for test purposes
      todoListServiceStub = {
        getTodos: () => Observable.create(observer => {
          observer.error('Error-prone observable');
        })
      };

      TestBed.configureTestingModule({
        imports: [FormsModule, CustomModule],
        declarations: [TodoListComponent],
        providers: [{provide: TodoListService, useValue: todoListServiceStub}]
      });
    });

    beforeEach(async(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        todoList = fixture.componentInstance;
        fixture.detectChanges();
      });
    }));


    it('generates an error if we don\'t set up a TodoListService', () => {
      expect(todoList.todos).toBeUndefined();
    });
  });
