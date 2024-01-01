
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { loadToy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"
import { loadReviews, removeReview, saveReview } from "../store/actions/review.actions"
import { utilService } from "../services/util.service"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [msgs, setMsgs] = useState(null)
    const [msgToEdit, setMsgToEdit] = useState({ txt: 'Add you massage' })
    const [reviewToEdit, setReviewToEdit] = useState({ txt: 'Enter your review', userId: '', toyId: '' })
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)



    const hadMsg = useRef(false)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            loadingToy()
        }

        catch (err) {
            console.log('err:', err)
            navigate('/toy')
        }
    }, [hadMsg.current, params.toyId])

    async function loadingToy() {
        try {
            const toy = await loadToy(params.toyId)
            await loadReviews({ username: '', toyId: toy._id })
            setToy(toy)
            loadMsgs(toy)
        }
        catch (err) { console.log('err:', err) }

    }

    function loadMsgs(toy) {
        if (user) {
            var msg = toy.msgs.find(msg => msg.by === user._id)
            if (msg) hadMsg.current = true
        }
        setMsgToEdit(() => msg || { txt: 'Add you massage' })
        setMsgs(toy.msgs)

    }

    if (!toy) return <div>Loading...</div>

    function handleChange({ target }) {
        let field = target.name
        let value = target.value
        if (field === 'txt')
            setMsgToEdit(prevMsg => ({ ...prevMsg, [field]: value }))
        else {
            field = 'txt'
            setReviewToEdit(prevR => ({ ...prevR, [field]: value }))
        }
    }

    function onRemoveMsg(msgId) {
        toyService.removeMsg(toy._id, msgId)
            .then(() => {
                setEditMsg(!isEditMsg)
                hadMsg.current = false
            }
            )
    }

    function onSaveMsg(ev) {
        ev.preventDefault()
        toyService.addMsg(toy._id, msgToEdit)
            .then(() => {
                setEditMsg(!isEditMsg)
            }
            )
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/toy')
    }

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            console.log('Removed!')

        }
        catch (err) { console.log('err', err) }
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        // setReviewToEdit(prevR => ({ ...prevR, userId: user._id, toyId: toy._id }))
        try {
            await saveReview({ txt: reviewToEdit.txt, userId: user._id, toyId: toy._id })
        }
        catch (err) {
            console.log('err:', err)
        }

    }


    return (
        <section className="toy-details">
            <div className="toy-txt">
                <header>Name: {toy.name}</header>
                <img src={toy.img || 'src/assets/img/' + utilService.getRandomIntInclusive(9, 19) + '.jpg'}></img>
                <p>Price: {toy.price}</p>
                <p>Labels: {toy.labels.toString()}</p>
                <p>InStock: {toy.inStock}</p>
            </div>
            <ul className="msgs">
                {msgs.map(msg =>
                    <li key={msg.id}>
                        {(user && (user.isAdmin || user._id === msg.by)) ?
                            <div className="msg-admin-btns">
                                <button onClick={() => onRemoveMsg(msg.id)}>Remove Massage</button>
                                <form onSubmit={onSaveMsg}>
                                    <input value={msgToEdit.txt} onChange={handleChange} name="txt" type="text"></input>
                                    <button>Save</button>
                                </form>
                            </div>
                            :
                            <p>{msg.txt}</p>
                        }
                        <p>By: {msg.by}</p>
                        <p>At: {msg.createdAt}</p>
                    </li>
                )
                }
                {
                    !hadMsg.current && user &&
                    <li>
                        <form onSubmit={onSaveMsg}>
                            <input value={msgToEdit.txt} onChange={handleChange} name="txt" type="text"></input>
                            <button>Save</button>
                        </form>

                    </li>
                }
            </ul >

            <ul className="reviews">
                {reviews && reviews.map(review =>
                    <li key={review._id}>
                        {(user && (user.isAdmin || user._id === review.user._id)) ?
                            <div className="review-admin-btns">
                                <button onClick={() => onRemoveReview(review._id)}>Remove Review</button>
                                <form onSubmit={onSaveReview}>
                                    <input value={review.content} onChange={handleChange} name="txt" type="text"></input>
                                    <button>Save</button>
                                </form>
                            </div>
                            :
                            <p>{review.content}</p>
                        }
                        <p>By: {review.user.nickname}</p>
                    </li>
                )
                }
                {
                    user &&
                    <li>
                        <form onSubmit={onSaveReview}>
                            <input value={reviewToEdit.txt} onChange={handleChange} name="txt" type="text"></input>
                            <button>Save</button>
                        </form>

                    </li>
                }
            </ul >
            <button onClick={onBack}>Back</button>
        </section >
    )
}



