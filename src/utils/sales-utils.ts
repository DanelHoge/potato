import { QUARTERS } from './date-utils';

export function prepareSalesEntry(
  form: {
    productID: string;
    productName: string;
    productManager?: string;
    salesStartDate: Date;
  }
) {
  const sales: Record<string, number | '-'> = {};

  for (const [quarter, range] of Object.entries(QUARTERS)) {
    const field = `sales${quarter}`;
    sales[field] = form.salesStartDate >= range.start ? '-' : 0;
  }

  return {
    productID: form.productID,
    productName: form.productName,
    productManager: form.productManager ?? '',
    ...sales
  };
}
