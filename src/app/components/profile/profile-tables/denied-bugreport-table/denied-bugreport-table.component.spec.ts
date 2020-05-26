import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { DeniedBugreportTableComponent } from './denied-bugreport-table.component';

describe('DeniedBugreportTableComponent', () => {
  let component: DeniedBugreportTableComponent;
  let fixture: ComponentFixture<DeniedBugreportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedBugreportTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedBugreportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
