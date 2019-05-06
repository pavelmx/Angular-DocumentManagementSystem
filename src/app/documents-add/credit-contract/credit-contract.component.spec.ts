import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditContractComponent } from './credit-contract.component';

describe('CreditContractComponent', () => {
  let component: CreditContractComponent;
  let fixture: ComponentFixture<CreditContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
