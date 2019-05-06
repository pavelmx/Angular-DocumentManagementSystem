import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalContractComponent } from './rental-contract.component';

describe('RentalContractComponent', () => {
  let component: RentalContractComponent;
  let fixture: ComponentFixture<RentalContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
