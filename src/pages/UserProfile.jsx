import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { loadUsers } from "../store/actions/user.actions"
import { loadReviews } from "../store/actions/review.actions"



export function UserProfile() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const users = useSelector(storeState => storeState.userMoudle.users)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [infoToChange, setInfoToChange] = useState({ ...user })
    const navigate = useNavigate()
    const isAdmin = user.isAdmin

    useEffect(() => {
        if (isAdmin)
            loadingUsers()
        loadingReviews()

    }, [])

    async function loadingUsers() {
        try {
            await loadUsers()
        }
        catch (err) {
            console.log('err:', err)

        }
    }

    async function loadingReviews() {
        try {
            await loadReviews({ name: user.nickname })
        }
        catch (err) { console.log('err:', err) }
    }


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
            {reviews &&
                <ul className="user-reviews">
                    {
                        reviews.map((review, idx) =>
                            <li key={idx}>
                                <p>Toy name: {review.toy.name}</p>
                                <p>Contect: {review.content}</p>
                            </li>
                        )
                    }
                </ul>}

            {
                isAdmin &&
                <ul className="users-list">
                    {
                        users.map((user, idx) =>
                            <li key={idx}>
                                <span>{user.username}</span>
                                <span>{user.fullname}</span>
                            </li>)
                    }
                </ul>
            }
        </section>
    )
}