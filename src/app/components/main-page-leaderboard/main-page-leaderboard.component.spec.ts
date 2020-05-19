import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageLeaderboardComponent } from './main-page-leaderboard.component';

describe('MainPageLeaderboardComponent', () => {
  let component: MainPageLeaderboardComponent;
  let fixture: ComponentFixture<MainPageLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
