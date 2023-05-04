export interface Stamp {
  id: number;
  name: string;
  description: string;
  collectedTime?: Date;
}

export interface Group {
  id: number;
  name: string;
  stamps: Stamp[];
  collectedTime?: Date;
}
