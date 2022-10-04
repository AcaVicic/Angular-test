import { TimeEntry } from "./time-entry";

export class Employee{

    timeEntries: TimeEntry[] = [];
    totalTime: number = 0;

    calculateTotalTime(): void{
        this.timeEntries.forEach(te => {
            this.totalTime += this.getHours(new Date(te.StarTimeUtc), new Date(te.EndTimeUtc));
        })
    }

    getHours(date1: Date, date2: Date): number{
        let d1 = date1.getTime();
        let d2 = date2.getTime();
        if(d2 < d1){
            return 0;
        }
        return Math.floor((d2 - d1) / 1000 / 60 / 60);
    }
}