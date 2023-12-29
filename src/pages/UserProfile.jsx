import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { loadUsers } from "../store/actions/user.actions"



export function UserProfile() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const users = useSelector(storeState => storeState.userMoudle.users)
    console.log("users:", users)
    const [infoToChange, setInfoToChange] = useState({ ...user })
    const navigate = useNavigate()
    const isAdmin = user.isAdmin

    useEffect(() => {
        if (isAdmin)
            loadUsers()
                .catch((err) => {
                    console.log('err:', err)
                })
    }, [])


    function handleChange({ target }) {
        const { name: field, value } = target
        setInfoToChange(prevInfo => ({ ...prevInfo, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const userToSave = { ...user, ...infoToChange }
        update(userToSave)
            .then(() => {
                navigate('/')
            })
            .catch((err) => console.log('err: ', err))
    }

    return (
        <section className="user-profile">
            <form className="user-edit" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={infoToChange.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <button>Save</button>
            </form>
            <ul className="users-list">
                {
                    users.map((user, idx) =>
                        <li key={idx}>
                            <span>{user.username}</span>
                            <span>{user.fullname}</span>
                        </li>)
                }
            </ul>
        </section>
    )
}