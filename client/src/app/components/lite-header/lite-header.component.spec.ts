import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteHeaderComponent } from './lite-header.component';

describe('LiteHeaderComponent', () => {
  let component: LiteHeaderComponent;
  let fixture: ComponentFixture<LiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiteHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
