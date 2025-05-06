export const QUARTERS = {
  Q1: { start: new Date('2022-01-01'), end: new Date('2022-03-31') },
  Q2: { start: new Date('2022-04-01'), end: new Date('2022-06-30') },
  Q3: { start: new Date('2022-07-01'), end: new Date('2022-09-30') },
  Q4: { start: new Date('2022-10-01'), end: new Date('2022-12-31') }
};


export function getQuarterForDate(date: Date): keyof typeof QUARTERS {
  const match = Object.entries(QUARTERS).find(
    ([,{start, end}]) => date >= start && date <= end
  );

  return match![0] as keyof typeof QUARTERS;
}
