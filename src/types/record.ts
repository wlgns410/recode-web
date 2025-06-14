export interface Record {
  id: number;
  text: string;
  date: Date;
}

export interface Records {
  [key: string]: Record[];
}
