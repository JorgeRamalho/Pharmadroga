export interface Product {
  id: number;
  name: string;
  priceOld: number;
  price: number;
  discount: string;
  icon: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  installments: number;
  interestFree: boolean;
}

export interface BrandColor {
  name: string;
  hex: string;
  usage: string;
}

export interface StoreStat {
  value: number;
  label: string;
  suffix?: string;
}

export type TypographyRole = 'display' | 'body' | 'price';
