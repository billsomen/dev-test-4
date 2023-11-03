export type Accessibility = 'High' | 'Medium' | 'Low';

export type Price = 'Free' | 'Low' | 'High';

export type Activity = {
  activity: string;
  accessibility: Accessibility;
  type: string;
  participants: number;
  price: Price;
  link: string;
  key: string;
  error?: string;
}

export type User = {
  id?: number
  name: string;
  accessibility: Accessibility;
  price: Price;
}
