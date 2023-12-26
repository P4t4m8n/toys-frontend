
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
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function remove(toyId) {
    return httpService.remove(BASE_URL, toyId)
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
    }
}




