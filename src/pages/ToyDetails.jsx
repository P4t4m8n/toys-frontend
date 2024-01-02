
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { loadToy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"
import { loadReviews, removeReview, saveReview } from "../store/actions/review.actions"
import { utilService } from "../services/util.service"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: 'Enter your review', userId: '', toyId: '' })
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const isReviewd = useRef(false)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            loadingToy()
        }

        catch (err) {
            navigate('/toy')
        }
    }, [isReviewd.current, params.toyId])


    async function loadingToy() {
        try {
            const toy = await loadToy(params.toyId)
            loadReviews({ username: '', toyId: toy._id })


            setToy(toy)
        }
        catch (err) { console.log(err) }
    }



    if (!toy) return <div>Loading...</div>

    function handleChange({ target }) {
        let field = target.name
        let value = target.value
        setReviewToEdit(prevMsg => ({ ...prevMsg, [field]: value }))

    }



    function onBack() {
        navigate('/toy')
    }

    console.log("reviews:", reviews)
    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            // isReviewd.current = false
        }
        catch (err) { console.log(err) }
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        try {
            await saveReview({ txt: reviewToEdit.txt, userId: user._id, toyId: toy._id })
            console.log("isReviewd.current :", isReviewd.current)
            isReviewd.current = true
            console.log("isReviewd.current :", isReviewd.current)
        }
        catch (err) {
        }

    }

    if (reviews && user) {

        var reviewCheck = reviews.find(rev => rev.user._id === user._id)
        if (reviewCheck) isReviewd.current = true
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

            <ul className="reviews">
                {reviews && reviews.map(review =>
                    <li key={review._id}>
                        {(user && (user.isAdmin || user._id === review.user._id)) &&
                            <button onClick={() => onRemoveReview(review._id)}>Remove Review</button>}

                        <p>By: {review.user.username}</p>
                        <p>{review.content}</p>
                    </li>
                )}


                {
                    user && !isReviewd.current &&
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



