import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

import { HeaderComponent } from '../../shared/header/header.component';
import { SalesStore } from '../../stores/sales.store';
import { prepareSalesEntry } from '../../../utils/sales-utils';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DatePickerModule,
    HeaderComponent,
    Message
  ],
  templateUrl: './new-product.component.html'
})

export class NewProductComponent {
  private fb = inject(FormBuilder);
  salesStore = inject(SalesStore);

  submitted = false;

  form = this.fb.group({
    productName: ['', [Validators.required, Validators.maxLength(50)]],
    productId: [null, [Validators.required, Validators.pattern(/^\d{1,13}$/)]],
    productManager: ['', [Validators.maxLength(30)]],
    salesStartDate: [null, [Validators.required]]
  });

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);

      // @ts-ignore
      const entry = prepareSalesEntry(this.form.value);
      this.salesStore.addEntry(entry);


      setTimeout(() => {
        this.form.reset();
        this.submitted = false;
      }, 1000);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClear() {
    this.form.reset();
    this.submitted = false;
  }
}
