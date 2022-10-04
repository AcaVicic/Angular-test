import { Component, OnInit } from '@angular/core';
import { TimeEntryService } from '../time-entry.service';
import { Employee } from '../models/emplyee';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  
  employees: Employee[] = [];

  constructor(private timeEntryService: TimeEntryService) { }

  ngOnInit(): void {
    this.timeEntryService.getEmployees().subscribe(data=> this.employees = data)
  }
}
