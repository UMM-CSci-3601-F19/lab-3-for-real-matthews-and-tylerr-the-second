import { Injectable } from '@angular/core';
import { todos } from './todos';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosListService {

  constructor() { }
}
