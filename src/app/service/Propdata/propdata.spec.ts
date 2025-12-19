import { TestBed } from '@angular/core/testing';

import { ListData } from './propdata';
describe('Propdata', () => {
  let service: ListData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
