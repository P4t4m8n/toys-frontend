import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadReviews } from "../store/actions/review.actions";


export function ReviewExplore() {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadingReviews()
    })

    async function loadingReviews() {
        try {
            await loadReviews({ username: '', toyId: '' })
        }
        catch (err) {
            console.log('err:', err)
        }
    }


    return (
        <ul className="reviews">
            {
                reviews.map((review, idx) =>
                    <li key={idx}>
                        <p>Toy name: {review.toy.name}</p>
                        <p>Contect: {review.content}</p>
                        <p>username: {review.user.username}</p>
                    </li>

                )}
        </ul>
    )
}