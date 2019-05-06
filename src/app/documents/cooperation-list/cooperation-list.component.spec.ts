import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperationListComponent } from './cooperation-list.component';

describe('CooperationListComponent', () => {
  let component: CooperationListComponent;
  let fixture: ComponentFixture<CooperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
