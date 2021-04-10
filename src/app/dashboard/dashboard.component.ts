import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';
import { asyncScheduler, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: User[];
  searchTerm$ = new Subject<string>();
  debounce = 500;
  scheduler = asyncScheduler;
  searchUserSubscription: Subscription;

  constructor(private userApi: UserApi) {}

  ngOnInit(): void {
    this.searchUserSubscription = this.searchTerm$
        .pipe(
            tap(s => console.log('going to debounce for, ', this.debounce)),
            debounceTime(this.debounce, this.scheduler),
            switchMap(first => {
              console.log('searching via api');
              return this.userApi.searchUser(first);
            })
        )
        .subscribe(s => (this.users = s));
  }

  ngOnDestroy(): void {
    if (this.searchUserSubscription) {
      this.searchUserSubscription.unsubscribe();
    }
  }

  onKeyup(first: string) {
    this.searchTerm$.next(first);
  }

  search(first) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }

  onKeyUp(first) {
    this.searchTerm$.next(first);
  }
}
