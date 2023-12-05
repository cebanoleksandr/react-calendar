const SET_DATE = 'SET_DATE';

const initialState: InitialState = {
  currentDate: new Date(),
};

type InitialState = {
  currentDate: Date,
};

const dateReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
  
    default:
      break;
  }
  return state;
}

//action creators
export const setDateAC = (newDate: Date): SetDate => {
  return {
    type: SET_DATE,
    payload: newDate,
  }
}

type SetDate = {
  type: typeof SET_DATE,
  payload: Date,
}

type ActionTypes = SetDate;

export default dateReducer;
