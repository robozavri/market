import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailActivationSuccessComponent } from './email-activation-success.component';

describe('EmailActivationSuccessComponent', () => {
  let component: EmailActivationSuccessComponent;
  let fixture: ComponentFixture<EmailActivationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailActivationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailActivationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
