export interface Stamp {
  id: number;
  name: string;
  description: string;
  isCollected: boolean;
}

export interface Group {
  id: number;
  name: string;
  stamps: Stamp[];
}
