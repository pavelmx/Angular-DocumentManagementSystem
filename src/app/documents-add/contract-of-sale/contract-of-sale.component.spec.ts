import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOfSaleComponent } from './contract-of-sale.component';

describe('ContractOfSaleComponent', () => {
  let component: ContractOfSaleComponent;
  let fixture: ComponentFixture<ContractOfSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOfSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
