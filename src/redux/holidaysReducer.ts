import { PublicHoliday } from "../utils/types";

const SET_HOLIDAYS = 'SET_HOLIDAYS';

const initialState: InitialState = {
  items: [],
};

type InitialState = {
  items: PublicHoliday[],
};

const holidaysReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_HOLIDAYS:
      return {
        ...state,
        items: action.payload,
      };
  
    default:
      break;
  }
  return state;
}

//action creators
export const setHolidaysAC = (holidays: PublicHoliday[]): SetHolidays => {
  return {
    type: SET_HOLIDAYS,
    payload: holidays,
  }
}

type SetHolidays = {
  type: typeof SET_HOLIDAYS,
  payload: PublicHoliday[],
}

type ActionTypes = SetHolidays;

export default holidaysReducer;
