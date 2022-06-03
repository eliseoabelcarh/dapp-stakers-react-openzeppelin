import {
  ADD_STAKER_TO_LIST,
  ADD_TODO,
  CLEAN_STAKERS_LIST,
  DELETE_TODO,
  UPDATE_BANK_CONTRACT,
  UPDATE_CURRENT_STAKER,
  UPDATE_TEKENTOKENCONTRACT,
} from "../actions/types";

const rootReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ADD_STAKER_TO_LIST:
      return {
        ...state,
        stakers: [...state.stakers, action.payload],
      };
      case CLEAN_STAKERS_LIST:
      return {
        //CLEAN ALL FIRST OJOOOOO TODO
        ...state,
        stakers: [],
      };
    case UPDATE_CURRENT_STAKER:
      return {
        ...state,
        currentStaker: action.payload,
      };
      case UPDATE_BANK_CONTRACT:
      return {
        ...state,
        bankContract: action.payload,
      };
      case UPDATE_TEKENTOKENCONTRACT:
        return {
          ...state,
          tekenTokenContract: action.payload,
        };
    default:
      return state;
  }
};

export default rootReducer;
