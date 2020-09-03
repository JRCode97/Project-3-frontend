import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugsComponent } from './admin-bugs.component';

describe('AdminBugsComponent', () => {
  let component: AdminBugsComponent;
  let fixture: ComponentFixture<AdminBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});