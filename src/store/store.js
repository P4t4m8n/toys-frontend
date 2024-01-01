
import { combineReducers, compose, legacy_createStore as createStore } from "redux"

import { toyRedcuer } from "./redcuers/toy.reducer"
import { appReducer } from "./redcuers/app.reducer"
import { userReducer } from "./redcuers/user.reducer"
import { reviewReducer } from "./redcuers/review.reducer"


const rootReducer = combineReducers({
    toyMoudle: toyRedcuer,
    appMoudle: appReducer,
    userMoudle: userReducer,
    reviewModule: reviewReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store





