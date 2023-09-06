import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RikybrasaComponent } from './rikybrasa.component';

describe('RikybrasaComponent', () => {
  let component: RikybrasaComponent;
  let fixture: ComponentFixture<RikybrasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RikybrasaComponent]
    });
    fixture = TestBed.createComponent(RikybrasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
