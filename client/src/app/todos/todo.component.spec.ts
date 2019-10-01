import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoComponent } from './todo.component';
import {TodoListService} from '../todos/todo-list.service';
import {Observable} from 'rxjs';
import { of } from 'rxjs';



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
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoComponent);
    todoComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('can retrieve Pat by ID', () => {
    todoComponent.setId('pat_id');
    expect(todoComponent.Todo).toBeDefined();
    expect(todoComponent.Todo.owner).toBe('Pat');
    expect(todoComponent.Todo.status).toBe(false);
  });

  it('returns undefined for Santa', () => {
    todoComponent.setId('Santa');
    expect(todoComponent.Todo).not.toBeDefined();
  });

});
