import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorGame } from './collector-game';

describe('CollectorGame', () => {
  let component: CollectorGame;
  let fixture: ComponentFixture<CollectorGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorGame],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectorGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
