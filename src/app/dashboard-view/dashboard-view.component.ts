import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  closeResult!: string;
  public currentWindowWidth!: number;

  user: User | null = null;
  subscriptions: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$.asObservable();
  constructor(
    private offcanvasService: NgbOffcanvas,
    private authService: AuthService
  ) {
    this.subscriptions.add(
      this.user$.subscribe((user: User) => (this.user = user))
    );
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
