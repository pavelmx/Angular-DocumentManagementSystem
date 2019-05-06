import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperationContractComponent } from './cooperation-contract.component';

describe('CooperationContractComponent', () => {
  let component: CooperationContractComponent;
  let fixture: ComponentFixture<CooperationContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperationContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperationContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
