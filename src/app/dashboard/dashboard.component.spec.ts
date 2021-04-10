import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../models/user";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            getAllUsers: jest.fn(),
            searchUser: jest.fn()
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('can search user by first name', () => {
    const user: User = { first: 'Rishabh', id: '23' };
    const users = [user];
    const $response = cold('-----a|', { a: users });
    userApi.searchUser = jest.fn(() => $response);

    component.search(user.first);
    getTestScheduler().flush();

    expect(component.users).toEqual(users);
  });

  xit('can search user in proper sequence', () => {
    userApi.searchUser = jest.fn(() =>
      cold('--------a|', { a: [{ first: 'John'}] })
    );
    component.onKeyUp('John');

    userApi.searchUser = jest.fn(() =>
      cold('--b|', { b: [{ first: 'Sean'}] })
    );
    component.onKeyUp('Sean');

    getTestScheduler().flush();
    expect(component.users).toEqual([{ first: 'Sean'} as User]);
  });

  it('Debounce before searching user by first name', () => {
    component.debounce = 30;
    const $response = cold('--a|', { a: [{ first: 'Chandra'}] });
    const $expected = cold('------b|', { b: [{ first: 'Chandra'}] });

    userApi.searchUser = jest.fn(() => $response);
    const scheduler = getTestScheduler();
    component.scheduler = scheduler;

    fixture.detectChanges();
    component.onKeyUp('Chandra');
    scheduler.flush();

    expect(component.users).toEqual($expected.values['b']);
  });
});

