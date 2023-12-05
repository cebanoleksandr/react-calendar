import { DayOfWeek, Month, TypeOption } from "./types";

export const daysOfWeek: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const months: Month[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const typeOptions: TypeOption[] = [
  {id: 'grey', option: 'Usual'},
  {id: 'blue', option: 'Important'},
  {id: 'red', option: 'Urgent'},
  {id: 'green', option: 'Extra'},
];
