
export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const EDIT_TOY = 'EDIT_TOY'

const initialState = {
    toys: [],
}

export function toyRedcuer(state = initialState, action = {}) {

    let toys
    switch (action.type) {


        case SET_TOYS:
            return { ...state, toys: action.toys }

        case ADD_TOY:
            toys = [...state.toys, action.todo]
            return { ...state, toys }

        case REMOVE_TOY:
            toys = state.toys.filter(todo => todo._id !== action.todoId)
            return { ...state, toys }

        case EDIT_TOY:
            toys = state.toys.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, toys }

        default:
            return state


    }
}
