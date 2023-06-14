import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../TestData/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../TestData/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../TestData/dao/impl/CategoryDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private tasksDaoArray = new TaskDAOArray()
  private categoryDaoArray = new CategoryDAOArray()

  getAllTasks(): Observable<Task[]> {
    return this.tasksDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll()
  }


}
