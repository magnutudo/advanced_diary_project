import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe   implements PipeTransform {

   transform(date: Date | string, format: string = "mediumDate"): string {

    if (date == null) {
      return "Без срока"
    }
    const currentDate = new Date().getDate()
    date = new Date(date)
    if (date.getDate() === currentDate) {
      return "Сегодня"
    }
    if (date.getDate() === currentDate - 1) {
      return "Вчера"
    }
    if (date.getDate() === currentDate + 1) {
      return "Завтра"
    }
    return new DatePipe('ru-Ru').transform(date, format);
  }

}
