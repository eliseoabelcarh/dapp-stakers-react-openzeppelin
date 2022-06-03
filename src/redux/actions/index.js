import { ADD_TODO, DELETE_TODO , ADD_STAKER_TO_LIST, UPDATE_CURRENT_STAKER} from "./types"

//en caso se usa APIs
// export const addTodoAction = todo => (dispatch) => {
//     fetch().then(
//         dispatch({
//             type:ADD_TODO,
//             payload: todo
//         })
//     )
// }
export const addTodoAction = todo => ({
    type: ADD_TODO,
    payload: todo
})
export const deleteTodoAction = todoId => ({
    type: DELETE_TODO,
    payload: todoId
})

export const addStakerToListAction = staker => ({
    type: ADD_STAKER_TO_LIST,
    payload:staker
})

export const updateCurrentStakerAction = staker => ({
    type: UPDATE_CURRENT_STAKER,
    payload:staker
})