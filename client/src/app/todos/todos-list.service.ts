import { Injectable } from '@angular/core';
import { Todos } from './todos';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosListService {

  constructor() { }
}
