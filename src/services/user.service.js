import axios from "axios"
import { httpService } from "./http.service"


export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    update,
    remove,
    getUsers,
    getById
}

const AUTH_URL = 'auth/'
const USER_URL = 'user/'
const STORAGE_KEY = 'loggedInUser'

function getLoggedinUser() {
    const entity = sessionStorage.getItem(STORAGE_KEY)
    return JSON.parse(entity)
}

function login({ username, password }) {
    return httpService.post(AUTH_URL + 'login', { username, password })
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user

        })
}

function signup(credentials) {
    return httpService.post(AUTH_URL + 'signup', credentials)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user

        })

}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    return httpService.post(AUTH_URL + 'logout')
}

function update(credentials) {
    return httpService.put(USER_URL + credentials._id, credentials)
}

async function getUsers() {
    return httpService.get('user')
}

function remove(userId) {
    httpService.delete(USER_URL + userId)

}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false
    }
}

