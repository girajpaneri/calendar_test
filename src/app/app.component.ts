import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var feather: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'calendar_gp';
  days = [
    [1, 8, 15, 22, 29],
    [2, 9, 16, 23, 30],
    [3, 10, 17, 24, 31],
    [4, 11, 18, 25, ''],
    [5, 12, 19, 26, ''],
    [6, 13, 20, 27, ''],
    [7, 14, 21, 28, ''],
  ];

  weekDays = [
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
    ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
    ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
    ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ];

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  monthsCalculated = [
    ['Apr', 'Jan', 'May', 'Aug', 'Feb', 'Jun', 'Sep'],
    ['Jul', 'Oct', '', '', 'Mar', '', 'Dec'],
    ['', '', '', '', '', 'Nov', ''],
  ];

  currentYear = new Date().getFullYear();

  ngOnInit() {
    feather.replace();
    this.calculateMonths();
  }

  updateYear(value: any) {
    this.currentYear = this.currentYear + value;
    this.calculateMonths();
  }

  calculateMonths() {
    let data: any = {};
    for (let i = 0; i < 12; i++) {
      const firstDay = new Date(this.currentYear, i, 1).getDay();
      if (data[firstDay]) {
        data[firstDay].push(i);
      } else {
        data[firstDay] = [i];
      }
    }

    let rows = 0;
    this.monthsCalculated = [];
    for (let i = 0; i < 12; ) {
      for (let j = 0; j < 7; j++) {
        if (!this.monthsCalculated[rows]) {
          this.monthsCalculated.push([]);
        }
        if (data[j].length) {
          i++;
          this.monthsCalculated[rows][j] = this.months[data[j][0]];
          data[j].splice(0, 1);
        } else {
          this.monthsCalculated[rows][j] = '';
        }
      }
      rows++;
    }
    for (let i = 0; i < this.monthsCalculated.length; i++ ) {
      let temp = this.monthsCalculated[i][0]
      this.monthsCalculated[i].splice(0, 1)
      this.monthsCalculated[i].push(temp)
    }
  }
}
