import { reviewService } from "../../services/review.service"
import { ADD_REVIEW, EDIT_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from "../redcuers/review.reducer"
import { store } from "../store"



export async function loadReviews(filterBy) {

  try {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
    return reviews

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function saveReview(review) {

  const type = (review._id) ? EDIT_REVIEW : ADD_REVIEW

  try {
    const savedReview = await reviewService.save(review)
    store.dispatch({ type: type, savedReview })
    
  } catch (err) {
    console.log('ReviewActions: err in savedReview', err)
    throw err
  }


}

export async function removeReview(reviewId) {

  try {
    await reviewService.remove(reviewId)
    store.dispatch({ type: REMOVE_REVIEW, reviewId })

  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}