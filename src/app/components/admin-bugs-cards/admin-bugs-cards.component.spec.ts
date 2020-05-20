import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugsCardsComponent } from './admin-bugs-cards.component';

describe('AdminBugsCardsComponent', () => {
  let component: AdminBugsCardsComponent;
  let fixture: ComponentFixture<AdminBugsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBugsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
