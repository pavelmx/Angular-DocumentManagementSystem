import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContractComponent } from './work-contract.component';

describe('WorkContractComponent', () => {
  let component: WorkContractComponent;
  let fixture: ComponentFixture<WorkContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
