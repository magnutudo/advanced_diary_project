import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../TestData/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../TestData/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../TestData/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../TestData/dao/impl/PriorityDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private tasksDaoArray = new TaskDAOArray()
  private categoryDaoArray = new CategoryDAOArray()
  private priorityDaoArray = new PriorityDAOArray()

  getAllTasks(): Observable<Task[]> {
    return this.tasksDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll()
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll()
  }

  updateTask(task: Task): Observable<Task> {
    return this.tasksDaoArray.update(task)
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category)
  }

  searchTasks(category: Category, text: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.tasksDaoArray.search(category, text, status, priority)
  }

  deleteTask(id: number): Observable<Task> {
    return this.tasksDaoArray.delete(id)
  }


}
