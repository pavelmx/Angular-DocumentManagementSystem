import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleEditComponent } from './sale-edit.component';

describe('SaleEditComponent', () => {
  let component: SaleEditComponent;
  let fixture: ComponentFixture<SaleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
