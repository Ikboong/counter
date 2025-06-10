
import { Denomination } from './types';

export const KRW_DENOMINATIONS: Denomination[] = [
  // Banknotes
  { id: 'krw_50000', label: '₩50,000', value: 50000, type: 'banknote', colorClass: 'bg-krw-50000', shortLabel: '5만', imageUrl: 'https://picsum.photos/seed/krw50000/120/60', bundleSize: 10 },
  { id: 'krw_10000', label: '₩10,000', value: 10000, type: 'banknote', colorClass: 'bg-krw-10000', shortLabel: '1만', imageUrl: 'https://picsum.photos/seed/krw10000/120/60', bundleSize: 10 },
  { id: 'krw_5000', label: '₩5,000', value: 5000, type: 'banknote', colorClass: 'bg-krw-5000', shortLabel: '5천', imageUrl: 'https://picsum.photos/seed/krw5000/120/60', bundleSize: 10 },
  { id: 'krw_1000', label: '₩1,000', value: 1000, type: 'banknote', colorClass: 'bg-krw-1000', shortLabel: '1천', imageUrl: 'https://picsum.photos/seed/krw1000/120/60', bundleSize: 10 },
  // Coins
  { id: 'krw_500', label: '₩500', value: 500, type: 'coin', colorClass: 'bg-krw-500', shortLabel: '5백', imageUrl: 'https://picsum.photos/seed/krw500/60/60', bundleSize: 40 },
  { id: 'krw_100', label: '₩100', value: 100, type: 'coin', colorClass: 'bg-krw-100', shortLabel: '1백', imageUrl: 'https://picsum.photos/seed/krw100/60/60', bundleSize: 50 },
  { id: 'krw_50', label: '₩50', value: 50, type: 'coin', colorClass: 'bg-krw-50', shortLabel: '5십', imageUrl: 'https://picsum.photos/seed/krw50/60/60', bundleSize: 50 },
  { id: 'krw_10', label: '₩10', value: 10, type: 'coin', colorClass: 'bg-krw-10', shortLabel: '1십', imageUrl: 'https://picsum.photos/seed/krw10/60/60', bundleSize: 50 },
];

export const INITIAL_COUNTS: Record<string, number> = KRW_DENOMINATIONS.reduce((acc, denom) => {
  acc[denom.id] = 0;
  return acc;
}, {} as Record<string, number>);

export const formatCurrency = (amount: number, locale: string = 'ko-KR', currency: string = 'KRW'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};