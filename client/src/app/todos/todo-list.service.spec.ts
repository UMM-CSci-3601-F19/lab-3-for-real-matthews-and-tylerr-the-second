import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';



describe('Todo list service: ', () => {
  // A small collection of test users
  const testTodos: Todo[] = [
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
      body: 'In',
      category: 'Software Design'
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: false,
      body: 'non',
      category: 'Video Games'
    }
  ];
  let todoListService: TodoListService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('getTodos() calls api/todos', () => {

    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    const req = httpTestingController.expectOne(todoListService.todoUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testTodos);
  });

  it('getTodoByID() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoListService.getTodoById(targetId).subscribe(
      todos => expect(todos).toBe(targetTodo)
    );

    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });
  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(3);
    let userName = 'a';
    expect(todoListService.filterTodos(testTodos, userName, null).length).toBe(2);
  });

  it('filterTodos() filters by status', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = false;
    expect(todoListService.filterTodos(testTodos, null, todoStatus).length).toBe(2);
  });

  it ('filterTodos() filters by body', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'lots';
    expect(todoListService.filterTodos(testTodos, null, null, todoBody).length).toBe(1);
  });

  it('filterTodos() filters by owner and status', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = true;
    let todoOwner = 'Chris';
    let todoBody = 'lots';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, todoBody).length).toBe(1);
  });
});

