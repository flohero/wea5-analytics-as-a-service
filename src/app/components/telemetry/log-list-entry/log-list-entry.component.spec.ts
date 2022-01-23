import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogListEntryComponent} from './log-list-entry.component';

describe('LogListEntryComponent', () => {
  let component: LogListEntryComponent;
  let fixture: ComponentFixture<LogListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogListEntryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
