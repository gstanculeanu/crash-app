import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  coins=1000;
  title = 'crash-app';
  @ViewChild('betAmount')
  betAmount!: ElementRef;
  inputTouched=false;
  currentMultiplier=1;
  isInBet=false;
  isRoundStarted=false;
  lastBet=0;
  isBettingButtonEnabled=true;
  isBetTime=false;
  constructor(){}


isRoundStartedEvent(event:boolean){
  if(this.betAmount){
    this.isRoundStarted=event;
  this.betAmount.nativeElement.disabled=event;

}
  
}
  onClickBetButton() {

    const betValue = parseInt(this.betAmount.nativeElement.value, 10);
    this.lastBet=betValue;
    if (isNaN(betValue) || betValue <= 0 || betValue > this.coins ) {
      // Display red error message below the input
      this.inputTouched = true;
      return;
    }
    else {
      this.inputTouched=false;
      this.isInBet=true;
      this.betAmount.nativeElement.disabled = true;
      if (this.currentMultiplier!=0)
      {
        this.coins=this.coins+betValue * this.currentMultiplier;
        this.isInBet=false;
      }
    }
  
  }
  setMultiplier(event:number){

  this.currentMultiplier= event;
if(this.betAmount){
  const betValue = parseInt(this.betAmount.nativeElement.value, 10);

if(this.isInBet && this.currentMultiplier==0){

  this.coins=this.coins-betValue;
  this.isInBet=false;
}
}
  }
  setIsBetTime(event:boolean){
    this.isBetTime=event;
   if (this.isBetTime && this.isInBet) {
  this.isBettingButtonEnabled = false;
} else if (this.isBetTime || this.isInBet) {
  this.isBettingButtonEnabled = true;
} else {
  this.isBettingButtonEnabled = !this.isRoundStarted;
}

    
    
    
  }

}
