import { Component, OnInit } from '@angular/core';
import { ToteBetsDataService } from './shared/services/totebet-data.service';

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-root app-tote-bet-calculator',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class ToteBetCalculatorComponent implements OnInit {
  betsDataInput: any;
  betsDividendOutput: any;

  constructor(private ToteBetsDataService: ToteBetsDataService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.betsDataInput = '';
  }

  submit() {
    console.log('inside submit()', this);
    this.ToteBetsDataService.calculate(this.betsDataInput).subscribe(response=> {
      console.log(response, 'this is the response');
      let result:any = response.result;
      this.betsDividendOutput = result.replace(/ /g, '\n');
    });

  }
}
