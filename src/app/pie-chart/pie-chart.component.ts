import { Component, Input, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { Employee } from '../models/emplyee';
import { TimeEntryService } from '../time-entry.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  employees: Employee[] = [];

  series: ApexNonAxisChartSeries = [];

  labels: string[] = [];

  chart: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }

  title: ApexTitleSubtitle = {
    text: "Employee chart"
  }

  constructor(private timeEntryService: TimeEntryService) { }

  ngOnInit(): void {
    this.timeEntryService.getEmployees().subscribe(data=> {
      this.employees = data;
      this.series = this.employees.map(e => e.totalTime);
      this.labels = this.employees.map(e => e.timeEntries[0].EmployeeName);
    });
  }

}
