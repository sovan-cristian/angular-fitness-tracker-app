import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  closeResult!: string;
  public currentWindowWidth!: number;

  constructor(private offcanvasService: NgbOffcanvas) {}

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }
}
