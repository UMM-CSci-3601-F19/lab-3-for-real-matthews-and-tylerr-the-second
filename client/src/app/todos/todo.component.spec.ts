import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { Todo } from './todo';
import {Observable, of} from 'rxjs';
import {TodoListService} from '../todos/todo-list.service';


describe('TodoComponent', () => {
  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => of([
        {
          _id: 'chris_id',
          Owner: 'Chris',
          Status: true,
          Body: 'lots of random latin',
          Category: 'computer science'
        },
        {
          _id: 'pat_id',
          Owner: 'Pat',
          Status: false,
          Body : 'In',
          Category: 'Software Design'
        },
        {
          _id: 'jamie_id',
          Owner: 'Jamie',
          Status: false,
          Body: 'non',
          Category: 'Video Games'
        }
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    todoComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can retrieve Pat by ID', () => {
    todoComponent.setId('pat_id');
    expect(todoComponent.Todo).toBeDefined();
    expect(todoComponent.Todo.Owner).toBe('Pat');
    expect(todoComponent.Todo.Status).toBe(false);
  });

  it('returns undefined for Santa', () => {
    todoComponent.setId('Santa');
    expect(todoComponent.Todo).not.toBeDefined();
  });

});
