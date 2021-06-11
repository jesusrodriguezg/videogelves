import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductModalComponent } from './update-product-modal.component';

describe('ModalComponent', () => {
  let component: UpdateProductModalComponent;
  let fixture: ComponentFixture<UpdateProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
