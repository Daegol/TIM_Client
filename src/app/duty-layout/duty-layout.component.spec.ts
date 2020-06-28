import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyLayoutComponent } from './duty-layout.component';

describe('DutyLayoutComponent', () => {
  let component: DutyLayoutComponent;
  let fixture: ComponentFixture<DutyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
