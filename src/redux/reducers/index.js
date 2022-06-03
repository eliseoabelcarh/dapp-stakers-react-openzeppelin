import { ADD_STAKER_TO_LIST, ADD_TODO, DELETE_TODO, UPDATE_CURRENT_STAKER } from "../actions/types";

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
      case UPDATE_CURRENT_STAKER:
        return {
          ...state,
          currentStaker: action.payload,
        };

    default:
      return state;
  }
};

export default rootReducer;
