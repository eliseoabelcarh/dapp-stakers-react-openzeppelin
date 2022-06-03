import { ADD_TODO, DELETE_TODO , ADD_STAKER_TO_LIST, UPDATE_CURRENT_STAKER, UPDATE_BANK_CONTRACT, UPDATE_TEKENTOKENCONTRACT, CLEAN_STAKERS_LIST} from "./types"

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

export const updateBankContractAction = bankContract => ({
    type:UPDATE_BANK_CONTRACT,
    payload: bankContract
})

export const updateTekenTokenContractAction = tekenTokenContract => ({
    type:UPDATE_TEKENTOKENCONTRACT,
    payload: tekenTokenContract
})

export const cleanStakersList = ()=>({
    type: CLEAN_STAKERS_LIST,
    payload:[]
})