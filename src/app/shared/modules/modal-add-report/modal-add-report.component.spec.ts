import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddReportComponent } from './modal-add-report.component';

describe('ModalAddReportComponent', () => {
  let component: ModalAddReportComponent;
  let fixture: ComponentFixture<ModalAddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
