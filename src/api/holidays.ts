import axios from "axios";
import { PublicHoliday } from "../utils/types";

const BASE_URL = 'https://date.nager.at/api/v3/PublicHolidays';

export const getHolidays = (year: number) => {
  return axios.get<PublicHoliday[]>(`${BASE_URL}/${year}/ua`);
};
