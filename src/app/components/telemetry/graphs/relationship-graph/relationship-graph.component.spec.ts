import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipGraphComponent } from './relationship-graph.component';

describe('RelationshipGraphComponent', () => {
  let component: RelationshipGraphComponent;
  let fixture: ComponentFixture<RelationshipGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationshipGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
