const SET_QUERY = 'SET_QUERY';
const SET_LABEL = 'SET_LABEL';

const initialState: InitialState = {
  query: '',
  label: 'all',
};

type InitialState = {
  query: string,
  label: string,
};

const filtersReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SET_LABEL:
      return {
        ...state,
        label: action.payload,
      };
  
    default:
      break;
  }
  return state;
}

//action creators
export const setQueryAC = (query: string): SetQuery => {
  return {
    type: SET_QUERY,
    payload: query,
  }
}

export const setLabelAC = (label: string): SetLabel => {
  return {
    type: SET_LABEL,
    payload: label,
  }
}

type SetQuery = {
  type: typeof SET_QUERY,
  payload: string,
}

type SetLabel = {
  type: typeof SET_LABEL,
  payload: string,
}

type ActionTypes = SetQuery | SetLabel;

export default filtersReducer;
