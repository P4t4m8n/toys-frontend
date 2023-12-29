import { userService } from "../../services/user.service"


export const SET_USER = 'SET_USER'
export const DELETE_USER = 'DELETE_USER'
export const EDIT_USER = 'EDIT_USER'
export const SET_USERS = 'SET_USERS'


const initialState = {
    userObj: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {

    switch (action.type) {

        case SET_USER:
            return { ...state, userObj: action.user }

        case EDIT_USER:
            return { ...state, userObj: action.user }

        case DELETE_USER: return {
            ...state,
            users: state.users.filter(user => user._id !== action.userId)
        }

        case SET_USERS: return { ...state, users: action.users }

        default:
            return state
    }
}
