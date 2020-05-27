import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMatComponent } from './login-mat.component';

describe('LoginMatComponent', () => {
  let component: LoginMatComponent;
  let fixture: ComponentFixture<LoginMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
