
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
})



const BASE_URL = 'toy/'

import { httpService } from './http.service.js'
export const toyService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getEmptyToy,
    addMsg,
    removeMsg,

}

export const i18Service = {
    getLanguages,
}

function getLanguages() {
    return {
        en: { nativeName: 'English' },
        he: { nativeName: 'עברית' }
    }
}

function query(filterSortBy) {
    return httpService.get(BASE_URL, filterSortBy)

}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + 'edit/' + toy._id, toy)
    } else {
        return httpService.post(BASE_URL + 'edit', toy)
    }
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function getDefaultFilter() {
    return {
        name: '', inStock: 'all', byLabel: [], sortBy: 'name'
    }
}

function getEmptyToy() {
    return {
        name: "",
        price: 0,
        labels: [],
        inStock: false,
        msgs: [],
    }
}

function addMsg(toyId, msg) {


    if (msg.id) {
        return httpService.put(BASE_URL + toyId + '/msg/' + msg.id, msg)
    } else {
        return httpService.post(BASE_URL + toyId + '/msg', msg)
    }
}

function removeMsg(toyId, msgId) {
    return httpService.delete(BASE_URL + toyId + '/' + msgId)
}




