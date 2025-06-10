
export interface Denomination {
  id: string;
  label: string;
  value: number;
  type: 'banknote' | 'coin';
  colorClass: string; 
  shortLabel: string;
  imageUrl?: string; 
  bundleSize?: number; // Added for bundle counting
}

export type DenominationCounts = Record<string, number>;