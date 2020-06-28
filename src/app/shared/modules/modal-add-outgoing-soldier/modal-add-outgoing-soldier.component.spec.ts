import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOutgoingSoldierComponent } from './modal-add-outgoing-soldier.component';

describe('ModalAddOutgoingSoldierComponent', () => {
  let component: ModalAddOutgoingSoldierComponent;
  let fixture: ComponentFixture<ModalAddOutgoingSoldierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddOutgoingSoldierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOutgoingSoldierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
