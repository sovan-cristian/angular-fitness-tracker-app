import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}
  public currentWindowWidth!: number;

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }

  public isMenuCollapsed = true;
}
