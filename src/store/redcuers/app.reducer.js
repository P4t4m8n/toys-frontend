import { toyService } from "../../services/toy.service"

export const FILTER = 'FILTER'
export const LOADING = 'LOADING'

const initialState = {
    isLoading: false,
    filterSortBy: toyService.getDefaultFilter(),
}
export function appReducer(state = initialState, action = {}) {
    switch (action.type) {

        case FILTER:
            let filterSortBy = { ...state.filterSortBy }
            return { ...state, filterSortBy }

        default:
            return state

    }

}