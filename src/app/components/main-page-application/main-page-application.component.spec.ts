import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageApplicationComponent } from './main-page-application.component';

describe('MainPageApplicationComponent', () => {
  let component: MainPageApplicationComponent;
  let fixture: ComponentFixture<MainPageApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
