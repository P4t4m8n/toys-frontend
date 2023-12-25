import { toyService } from "../../services/toy.service";
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_TOYS } from "../redcuers/toy.reducer";
import { store } from "../store"


export function loadToys(filterSortBy) {

    return toyService.query(filterSortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}

export function loadToy(toyId) {
    return toyService.getById(toyId)
        .then(toy => {
            return toy
        })
        .catch(err => {
            console.log('toy action -> Cannot load toy', err)
            throw err
        })

}

export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .then(() => console.log('Removed!'))
        .catch((err) => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })


}

export function saveToy(toy) {
    
    const type = (toy._id) ? EDIT_TOY : ADD_TOY
    
    return toyService.save(toy)
    .then((savedtoy) => {
            store.dispatch({ type: type, toy: savedtoy })
            console.log('Saved')
        })
        .catch((err) => {
            console.log('toy action -> Cannot save toy', err)
        })

}