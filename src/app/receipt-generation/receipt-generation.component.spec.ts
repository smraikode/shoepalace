import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptGenerationComponent } from './receipt-generation.component';

describe('ReceiptGenerationComponent', () => {
  let component: ReceiptGenerationComponent;
  let fixture: ComponentFixture<ReceiptGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
