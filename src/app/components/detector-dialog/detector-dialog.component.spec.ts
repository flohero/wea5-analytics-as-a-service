import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetectorDialogComponent} from './detector-dialog.component';

describe('DetectorDialogComponent', () => {
  let component: DetectorDialogComponent;
  let fixture: ComponentFixture<DetectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetectorDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
