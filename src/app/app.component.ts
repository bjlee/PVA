import { Component, OnInit } from '@angular/core';

import { DataframeService } from './services/dataframe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private dataframeService: DataframeService) { }

  ngOnInit() {
    this.dataframeService.getDataframe('watch')
      .subscribe(dataframe => {
        console.log(dataframe);
      });
  }
}
