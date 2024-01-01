
export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const EDIT_TOY = 'EDIT_TOY'
export const SET_CURR_TOY = 'SET_CURR_TOY'

const initialState = {
    toys: [],
}

export function toyRedcuer(state = initialState, action = {}) {

    let toys
    switch (action.type) {


        case SET_TOYS:
            return { ...state, toys: action.toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case EDIT_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }


        default:
            return state


    }
}
