import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TimeEntry } from './models/time-entry';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/emplyee';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  timeEntriesUrl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

  getEmployees(): Observable<Employee[]>{
    return this.http.get<TimeEntry[]>(this.timeEntriesUrl).pipe(
      map(data => {
        let distinctTimeEntries: TimeEntry[];
        let employees: Employee[];
        distinctTimeEntries = this.getDistinctTimeEntries(data);
        employees = this.pushTimeEntriesByEmployee(data, distinctTimeEntries);
        employees.sort((a, b) => b.totalTime - a.totalTime)
        return employees;
      })
    );
  }

  constructor(private http: HttpClient) { }

  getDistinctTimeEntries(timeEntries: TimeEntry[]): TimeEntry[]{
    return timeEntries.filter(
      (timeEntrie, i, arr) => arr.findIndex(t => t.EmployeeName === timeEntrie.EmployeeName) === i
    );
  }

  pushTimeEntriesByEmployee(timeEntries: TimeEntry[], distinctTimeEntries: TimeEntry[]){
    let employees: Employee[] = [];
    distinctTimeEntries.filter(te => te.EmployeeName != null).forEach(te => {
      let employee = new Employee();
      timeEntries.forEach(timeEntrie => {
        if(te.EmployeeName === timeEntrie.EmployeeName){
          employee.timeEntries?.push(timeEntrie);
        }
      })
      employee.calculateTotalTime();
      employees.push(employee);
    })
    return employees;
  }
}
