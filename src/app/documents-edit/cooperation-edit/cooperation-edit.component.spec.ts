import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperationEditComponent } from './cooperation-edit.component';

describe('CooperationEditComponent', () => {
  let component: CooperationEditComponent;
  let fixture: ComponentFixture<CooperationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
