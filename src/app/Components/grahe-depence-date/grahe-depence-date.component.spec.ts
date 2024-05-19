import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraheDepenceDateComponent } from './grahe-depence-date.component';

describe('GraheDepenceDateComponent', () => {
  let component: GraheDepenceDateComponent;
  let fixture: ComponentFixture<GraheDepenceDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraheDepenceDateComponent]
    });
    fixture = TestBed.createComponent(GraheDepenceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
