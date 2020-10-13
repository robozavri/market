import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteLayoutComponent } from './lite-layout.component';

describe('LiteLayoutComponent', () => {
  let component: LiteLayoutComponent;
  let fixture: ComponentFixture<LiteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiteLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
