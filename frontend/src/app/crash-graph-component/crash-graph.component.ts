import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainPageService } from '../services/main-page-service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-annotation';
import { timeout } from 'rxjs';
Chart.register(...registerables);
@Component({
  selector: 'app-crash-graph',
  templateUrl: './crash-graph.component.html',
  styleUrls: ['./crash-graph.component.scss']
})
export class CrashGraphComponent implements OnInit{
  crashScore='1';
  start=false;
  end=false;
  myChart:any;
  constructor(private mainPageService: MainPageService) { }

  ngOnInit(): void {
  this.startGame();
    
  }
  
  countDownFromSeven(callback: () => void): void {
    let count = 7;
  
    const countdown = () => {

  
      if (count > 0) {
        setTimeout(countdown, 1000);
        this.crashScore = `Waiting for bets ${count}`;
      } else {
        callback(); // Invoke the callback function
      }
  
      count--;
    };
  
    countdown(); // Start the countdown
  }
  
  

addData(chart: any, label: any, data: any) {

  const indexes: number[] = [];
  chart.data.labels.forEach((existingLabel: any, index: number) => {
    if (existingLabel === label) {
      indexes.push(index);
    }
  });

  if (indexes.length > 0) {
    indexes.forEach((index: number) => {
      chart.data.datasets.forEach((dataset: { data: any[] }) => {
        dataset.data[index] = data;
      });
    });
    chart.update();
  }
}
startGame(){
  const crashPoint: string = this.getCrashPoint().toString();
  console.log(crashPoint);
  this.myChart = this.generateGraph(1);


  const delay = 70; // Delay in milliseconds
  const existingLabel = '';

  let i = 1;
  let multiplier = i.toFixed(2);
  const checkLoop = () => {
    if (parseFloat(multiplier) === parseFloat(crashPoint)) {
      this.crashScore = `Crashed at ${crashPoint}x`;
      this.end = true;
      clearTimeout(timer); // Stop the timer
      setTimeout(() => {
        this.resetGameState(); // Reset the game after 3 seconds
      }, 3000);
    } else if (parseFloat(multiplier) < parseFloat(crashPoint)) {
      this.crashScore = multiplier;
      this.start=true;
      this.addData(this.myChart, existingLabel, multiplier);
      i += 0.01; // Increment i here after adding data
      multiplier = i.toFixed(2); // Update the multiplier value
      timer = setTimeout(checkLoop, delay); // Call checkLoop recursively
    }
  };
  
  let timer: any;

this.countDownFromSeven(() => {
// Code to execute after countDownFromSeven finishes
timer = setTimeout(checkLoop, delay); // Start the first timer
});
  
}
resetGameState(){
  this.myChart.destroy();
  this.crashScore='1';
  this.start=false;
  this.end=false;
  this.startGame();
}
calculateWinChance(multiplier: number): number {
  const x = multiplier;
  const chanceToWin =
    (1 / 33 + (32 / 33) * (0.01 + 0.99 * (1 - 1 / x - 0.01))) * -1 +
    (x - 1) * (1 - (1 / 33 + (32 / 33) * (0.01 + 0.99 * (1 - 1 / x - 0.01))));

  return chanceToWin;
}
 getCrashPoint() {
  const e = 2**32
  const h = crypto.getRandomValues(new Uint32Array(1))[0]
  // if h % (100 / desired_precentage) is 0 then the game will crash immediately 
  if (h % 33.3 == 0) return 1
  return Math.floor((100*e-h) / (e-h)) / 100
}
  generateGraph(value:number){
   return  new Chart("myChart", {
      type: 'line',
      data: {
          labels: ['Begin',''],
          datasets: [{
              label: 'Crash Game',
              data: [1,value],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  
              }
          }
      }
  });
  }
}
