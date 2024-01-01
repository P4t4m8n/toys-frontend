import { asyncService } from "./async-storage.service"
import { httpService } from "./http.service"
import { toyService } from "./toy.service"

const BASE_URL = 'review/'


export const reviewService = {
   save,
  query,
  remove,
  getDefaultFilter
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(BASE_URL, filterBy)
  // return asyncService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await asyncService.remove('review', reviewId)
}

async function save(review) {

  if (review._id) {
    return httpService.put(BASE_URL + 'edit/' + review._id, review)
  } else {
    return httpService.post(BASE_URL + 'edit', review)
  }
}


function getDefaultFilter() {
  return { name: '', toyId: '' }
}