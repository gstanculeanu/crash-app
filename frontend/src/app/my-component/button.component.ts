import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainPageService } from '../services/main-page-service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-button-comp',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(private mainPageService: MainPageService) { }
  handleButtonClick() {
    // Send an HTTP request to the Node.js backend
    this.mainPageService.getEndpointData().pipe(tap((message)=>console.log(message))).subscribe()

  }
  
}
