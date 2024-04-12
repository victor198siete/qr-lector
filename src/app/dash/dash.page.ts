import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  @ViewChild('myTabs', { static: true }) tabs?: IonTabs;
  selectedTab?: string;

  constructor() { }

  ngOnInit() {
  }

  tabChanged() {
    console.log(this.selectedTab);
    const selectedTab = this.tabs?.getSelected();
    console.log(this.selectedTab);
    this.selectedTab = selectedTab;
  }
}
