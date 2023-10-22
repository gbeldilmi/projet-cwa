import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterComponent } from './alter.component';

describe('AlterComponent', () => {
  let component: AlterComponent;
  let fixture: ComponentFixture<AlterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterComponent]
    });
    fixture = TestBed.createComponent(AlterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
