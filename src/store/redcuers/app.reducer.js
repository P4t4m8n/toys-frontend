import { toyService } from "../../services/toy.service"

export const FILTER = 'FILTER'
export const LOADING = 'LOADING'

export const SET_LABELS = "SET_LABELS"
export const ADD_LABEL = "ADD_LABEL"
export const EDIT_LABEL = "EDIT_LABEL"
export const REMOVE_LABEL = "REMOVE_LABEL"


const initialState = {
    isLoading: false,
    filterSortBy: toyService.getDefaultFilter(),
    labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}
export function appReducer(state = initialState, action = {}) {

    let labels
    switch (action.type) {

        case FILTER:

            console.log("action.filterSort:", action.filterSort)
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            console.log("filterSortBy:", filterSortBy)

            return { ...state, filterSortBy }

        //LABELS


        case SET_LABELS:
            return { ...state, labels: action.labels }

        case ADD_LABEL:
            labels = [...state.labels, action.label]
            return { ...state, labels }

        case REMOVE_LABEL:
            labels = state.labels.filter(label => label !== action.label)
            return { ...state, toys }

        case EDIT_LABEL:
            labels = state.labels.map(label => label === action.label ? action.label : label)
            return { ...state, labels }

        default:
            return state

    }

}